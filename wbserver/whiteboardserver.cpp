#include"whiteboardserver.h"
#include<QDebug>
#include<algorithm>
#include<QJsonArray>
#include<QJsonDocument>
#include<QJsonObject>
#include<QJsonValue>


WhiterboardServer::WhiterboardServer(QObject *parent)
{

}

WhiterboardServer::~WhiterboardServer(){

}


void WhiterboardServer::incomingConnection(qintptr sock)
{
    ClientConnection *conn = new ClientConnection(this);
    conn->setSocketDescriptor(sock);//设置描述符m
    m_clients.push_back(conn);
    connect(conn,SIGNAL(userJoined(QByteArray,int)),
            this,SLOT(onUserJoined(QByteArray,int)));

    connect(conn,SIGNAL(userLeft(QByteArray,int)),
            this,SLOT(onUserLeft(QByteArray,int)));

    connect(conn,SIGNAL(addFigureReq(QJsonObject)),
            this,SLOT(onAddFigureReq(QJsonObject)));

    connect(conn,SIGNAL(deleteFigureReq(int)),
            this,SLOT(onDeleteFigureReq(int)));

    connect(conn,SIGNAL(clearReq(int)),
            this,SLOT(onClearReq(int)));

    qDebug() <<__FUNCTION__ << " : " <<conn->info();

}

void WhiterboardServer::onUserJoined(QByteArray name,int id)
{
    auto it = std::find_if(m_clients.begin(),m_clients.end(),
                           [=](ClientConnection *&conn)
    {
        return id == conn->id();


    });
    if(it != m_clients.end())
    {
        QJsonDocument doc;
        QJsonObject rootObj;
        rootObj.insert("type",QJsonValue("join_reply"));
        rootObj.insert("id",QJsonValue(id));

        if(m_figures.size() > 0)
        {
            rootObj.insert("figures",QJsonValue(m_figures));
        }

        doc.setObject(rootObj);
        QByteArray jsonString = doc.toJson(QJsonDocument::Compact);
        jsonString.append('\n');

        (*it)->write(jsonString);

        QJsonDocument joinDoc;
        QJsonObject joinObj;
        joinObj.insert("type",QJsonValue("user_joined"));
        joinObj.insert("id",QJsonValue(id));
        QString strName = QString::fromUtf8(name);
        joinObj.insert("name" ,QJsonValue(strName));
        joinDoc.setObject(joinObj);
        QByteArray joinedMsg = joinDoc.toJson(QJsonDocument::Compact);
        joinedMsg.append('\n');
        for(auto c : m_clients)
        {
            if(c->id()!=id)
            {
                c->write(joinedMsg);
            }
        }

    }


}

void WhiterboardServer::onUserLeft(QByteArray name, int id)
{
    QJsonDocument doc;
    QJsonObject rootObj;
    rootObj.insert("type",QJsonValue("user_left"));
    rootObj.insert("id",QJsonValue(id));
    QString strName = QString::fromUtf8(name);
    rootObj.insert("name",QJsonValue(strName));
    doc.setObject(rootObj);
    QByteArray jsonString = doc.toJson(QJsonDocument::Compact);
    jsonString.append('\n');


    bool removed = false;
    m_clients.remove_if(
                [=,&removed](ClientConnection *&c){
        if(id == c->id())
        {
            removed = true;
            c->write(jsonString);
            c->resetState();
            return true;

        }
        return false;
    });
    if(!removed) return ;

    qDebug() << "WhiteboardServer::onUserLeft user_left";
    for(auto c:m_clients) c->write(jsonString);


}


void WhiterboardServer::onAddFigureReq(const QJsonObject &figure)
{
    m_figures.append(QJsonValue(figure));
    QJsonDocument doc;
    QJsonObject obj;
    obj.insert("type", QJsonValue("add"));
    obj.insert("figure",QJsonValue(figure));
    doc.setObject(obj);
    QByteArray msg = doc.toJson(QJsonDocument::Compact);
    msg.append('\n');

    for(auto c:m_clients) c->write(msg);


}

void WhiterboardServer::onDeleteFigureReq(int globalId)
{
    for(auto it = m_figures.begin();it!=m_figures.end();)
    {
        if(globalId ==it->toObject().value("global_id").toInt())
        {
            qDebug() << __FUNCTION__ << "delete a figure";
            m_figures.erase(it);
            break;
        }
        it++;
    }
    char msg[128] = {0};
    int sz = sprintf(msg,"{\"type\":\"delete\",\"global_id\":%d}\n",globalId);
    for(auto c: m_clients) c->write(msg,sz);

}

void WhiterboardServer::onClearReq(int ownerId)
{
    if(ownerId == -1)
    {
        while (m_figures.size())
        {
            m_figures.pop_front();
        }
    }
    else
    {
        auto it = m_figures.begin();
        while(it != m_figures.end())
        {
            if(ownerId == it->toObject().value("creator").toInt())
            {
                m_figures.erase(it);
                qDebug() << __FUNCTION__ <<"delete a figure of" <<ownerId;
                break;
            }
            it++;
        }
    }

    char msg[128] = {0};
    int sz = sprintf(msg,"{\"type\":\"clear\",\"owner_id\":%d}\n",ownerId);
    for(auto c: m_clients) c->write(msg,sz);

}















