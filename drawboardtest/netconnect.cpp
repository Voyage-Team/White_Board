#include "netconnect.h"
#include<QDebug>
#include<QJsonDocument>
#include<QJsonArray>
#include<QJsonObject>
#include<QJsonValue>

NetConnect::NetConnect(QObject *parent)
    :QTcpSocket(parent)
{

    connect(this,SIGNAL(connected()),
            this,SLOT(onConnected()));
    connect(this,SIGNAL(readyRead()),
            this,SLOT(onReadyRead()));
    connect(this,SIGNAL(error(QAbstractSocket::SocketError)),
            this,SLOT(onError(QAbstractSocket::SocketError)));

}

NetConnect::~NetConnect()
{

}

void NetConnect::join(QString name, QString host, int port)
{
    m_name = name;
    qDebug() <<"xixi";
    connectToHost(host,port);
}

void NetConnect::left()
{
    const char leftMsg[] = "{\"type\":\"left\"}\n";
    write(leftMsg);
}


void NetConnect::onConnected()
{
    qDebug() <<__FUNCTION__;
    QJsonDocument doc;
    QJsonObject obj;
    obj.insert("type",QJsonValue("join"));
    obj.insert("name",QJsonValue(m_name));
    doc.setObject(obj);
    QByteArray joinMsg = doc.toJson(QJsonDocument::Compact);
    joinMsg.append('\n');
    write(joinMsg);
}


void NetConnect::addFigure(const QJsonObject &figure)
{
    QJsonDocument doc;
    QJsonObject obj;
    obj.insert("type",QJsonValue("add"));
    obj.insert("figure",QJsonValue(figure));
    doc.setObject(obj);

    QByteArray msg = doc.toJson(QJsonDocument::Compact);
    msg.append('\n');
    write(msg);
    flush();


}

void NetConnect::deleteFigure(int id)
{
    QString msg = QString("{\"type\":\"delete\",\"global_id\":%1}\n").arg(id);
    QByteArray sendMsg = msg.toUtf8();
    write(sendMsg);
    flush();

}

void NetConnect::clearFigure(int ownerId)
{
    QString msg = QString("{\"type\":\"clear\",\"owner_id\":%1}\n").arg(ownerId);
    QByteArray sendMsg = msg.toUtf8();
    write(sendMsg);
    flush();
}


void NetConnect::onReadyRead()
{
    qDebug() <<__FUNCTION__;
    while(canReadLine())
    {
        // qDebug() <<"you shuju";
        QByteArray data = readLine();
        data.chop(1);

        QJsonParseError error;
        QJsonDocument doc = QJsonDocument::fromJson(data,&error);
        if(error.error  == QJsonParseError::NoError)
        {
            QJsonObject obj = doc.object();
            QString type = obj.value("type").toString();
            //if(type == "join_repley")
            if(type == "join_reply")
            {
                m_id = obj.value("id").toInt();
                qDebug() << "join_repley name:" << m_name;

                QJsonArray figures = obj.value("figures").toArray();
                for(auto it = figures.begin();it!=figures.end();it++)
                {
                    emit figureAdded((*it).toObject());
                }
                emit joined(m_name,m_id);

            }
            else if(type == "user_joined")
            {
                QString name = obj.value("name").toString();
                qDebug() <<"user_joined name" << name;
                //int id = obj["id"].toInt();
                int id = obj.value("id").toInt();
                emit joined(name,id);
            }
            // else if(type == "user_left")
            else if(type == "user_left")
            {
                QString name = obj.value("name").toString();
                //int id = obj["id"].toInt();
                int id = obj.value("id").toInt();
                emit userLeft(name,id);
            }
            else if(type =="add")
            {
                auto figures = obj.value("figure").toObject();
                emit figureAdded(figures);
            }
            else if(type =="delete")
            {
                auto global = obj.value("global_id").toInt();
                emit figureDeleted(global);
            }
            else if(type =="clear")
            {
                auto owner = obj.value("owner_id").toInt();
                emit figureCleared(owner);

            }
            else
            {
                qDebug() <<"类型的种类" <<type;
            }

        }

    }
}

void NetConnect::onError(QAbstractSocket::SocketError err)
{
    qDebug() << "Error occurred" << errorString();
    emit errorOccured(errorString());


}
















