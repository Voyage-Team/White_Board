#include "dialog.h"
#include "ui_dialog.h"
#include <QDebug>
#include <winsock2.h>
#include <synchapi.h>

Dialog::Dialog(QWidget *parent)
    : QDialog(parent)
    , ui(new Ui::Dialog)
{
    ui->setupUi(this);
    _pTimer = new QTimer;
    dataRecvWS = Q_NULLPTR;
    createDataRecvWS();

}

Dialog::~Dialog()
{
    delete ui;
}


void Dialog::createDataRecvWS() {
    //_pTimer = new QTimer;
    if (dataRecvWS == Q_NULLPTR) {
        dataRecvWS = new QWebSocket();
        qDebug()<<"create websocket!";
        connect(dataRecvWS,&QWebSocket::disconnected,this,&Dialog::onDisconnected);
        connect(dataRecvWS,&QWebSocket::textMessageReceived,this,&Dialog::onTextReceived);
        connect(dataRecvWS,&QWebSocket::connected,this,&Dialog::onConnected);
        connect(_pTimer,SIGNAL(timeout()),this,SLOT(reconnect()),Qt::AutoConnection);
        dataRecvWS->open(QUrl("ws://198.148.99.145:8000"));
    }

}

//断开连接会触发这个槽函数
void Dialog::onDisconnected()
{
    _pTimer->start(3000);
    qDebug("websocket is disconnected");
}
//连接成功会触发这个槽函数
void Dialog::onConnected()
{
    _pTimer->stop();
    qDebug("connect successful");
}
//收到服务发来的消息会触发这个槽函数
void Dialog::onTextReceived(QString msg)
{
    qDebug("textReceiveString");
}
//断开连接会启动定时器，触发这个槽函数重新连接
void Dialog::reconnect()
{
    qDebug("websocket reconnected");
    dataRecvWS->abort();
    dataRecvWS->open(QUrl("ws://198.148.99.145:8000"));
}
