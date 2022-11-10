#ifndef WHITEBOARDSERVER_H
#define WHITEBOARDSERVER_H

#include"clientconnection.h"
#include<QTcpServer>
#include<list>
#include<QJsonArray>
class  WhiterboardServer:public QTcpServer
{
    Q_OBJECT
public:
     WhiterboardServer(QObject *parent = 0);
     ~WhiterboardServer();

protected:
     void incomingConnection(qintptr sock);

protected slots:
     void onUserJoined(QByteArray name ,int id);
     void onUserLeft(QByteArray name ,int id);

     void onAddFigureReq(const QJsonObject &figure);
     void onDeleteFigureReq(int globalId);
     void onClearReq(int ownerId);

protected:
     std::list<ClientConnection *> m_clients;

     QJsonArray m_figures;
};




#endif // WHITEBOARDSERVER_H
