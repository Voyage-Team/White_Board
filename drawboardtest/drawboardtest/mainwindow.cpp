#include "mainwindow.h"
#include "ui_mainwindow.h"
#include <QVBoxLayout>
#include <QToolBar>


MainWindow::MainWindow(QWidget *parent)
    : QMainWindow(parent)
    , ui(new Ui::MainWindow)
{
    _pTimer = new QTimer;
    ui->setupUi(this);
    ui->la->hide();
    ui->lb->hide();
    ui->pushButton->hide();
    setMouseTracking(true);
}

MainWindow::~MainWindow()
{
    delete ui;
}

void MainWindow::closeEvent(QCloseEvent *event)
{
    switch (QMessageBox::information(this,tr("提示"),tr("若未清理所有图元点击返回按钮清理!"),
                                     ("已清理"),tr("返回"),0,1)) {
    case 0:

        event->accept();
        break;
    case 1:
        event->ignore();
        break;
    default:
        break;
    }
}

void MainWindow::hideUi2()
{
    ui->jpg->hide();
    ui->l1->hide();
    ui->la->hide();
    ui->lb->hide();
    ui->pushButton->hide();
    ui->back->hide();
}

void MainWindow::prepareCanvas()
{

    QToolBar *toolbar = addToolBar("Figure Type");
    QActionGroup *actionGroup = new QActionGroup(toolbar);

    m_toolBar = toolbar;

    QAction *action = toolbar->addAction(QIcon(":/png/line.png"),
                                         "Draw a Line",
                                         this,SLOT(DrawLine()));
    action->setCheckable(true);
    action->setChecked(true);
    action->setActionGroup(actionGroup);

    action = toolbar->addAction(QIcon(":/png/Rectangle.png"),
                                "Draw a Rectangle",
                                this,SLOT(DrawRec()));
    action->setCheckable(true);
    action->setActionGroup(actionGroup);

    action = toolbar->addAction(QIcon(":/png/Oval.png"),
                                "Draw a Oval",this,SLOT(DrawOval()));
    action->setCheckable(true);
    action->setActionGroup(actionGroup);

    action = toolbar->addAction(QIcon(":/png/Triangle.png"),
                                "Draw a Triangle",this,SLOT(DrawTri()));
    action->setCheckable(true);
    action->setActionGroup(actionGroup);

    action = toolbar->addAction(QIcon(":/png/curve.png"),
                                "Draw as you like",this,SLOT(DrawCurve()));
    action->setCheckable(true);
    action->setActionGroup(actionGroup);

    toolbar->addSeparator();
    action = toolbar ->addAction(QIcon(":/png/revoke.png"),
                                 "Delete the Last",this,SLOT(Rev()));
    //action->setCheckable(true);
    action->setActionGroup(actionGroup);


    action = toolbar->addAction(QIcon(":/png/delete.png"),
                                "Clear All",this,SLOT(Del()));
    //action->setCheckable(true);
    action->setActionGroup(actionGroup);

    m_scene = new QScene();
    View *vieww = new View(m_scene);
    connect(m_scene,SIGNAL(addFigureReq(QJsonObject)),this,SLOT(onSend(QJsonObject)));

//    connect(m_scene,SIGNAL(addFigureReq(QJsonObject)),
//            this,SLOT(onAddFigureReq(QJsonObject)));
//    connect(m_scene,SIGNAL(deletFigureReq(int)),
//            this,SLOT(onDeleteFigureReq(int)));
//    connect(m_scene,SIGNAL(clearFigureReq(int)),
//            this,SLOT(onClearFigureReq(int)));

    setCentralWidget(vieww);
//    Join();
    //setCentralWidget(this->centralWidget());
}

void MainWindow::hideUi1()
{
    ui->button1->hide();
    ui->button2->hide();
    ui->jpg->hide();
    ui->l1->hide();
    ui->l2->hide();
    ui->l3->hide();
    ui->back->hide();
}


void MainWindow::on_button2_clicked()
{
    ui->button1->hide();
    ui->button2->hide();
    //ui->l1->hide();
    ui->l2->hide();
    ui->l3->hide();
    ui->la->show();
    ui->lb->show();
    ui->pushButton->show();
}


void MainWindow::on_button1_clicked()
{
    //    dialog = new Dialog111;
    //    dialog->showNormal();
    int numC = rand()%100;
    Q_EMIT SIG_Num_Create(numC);

}


void MainWindow::on_pushButton_clicked()
{
    QString numQ = ui->la->text();
    int num = numQ.toInt();
    Q_EMIT SIG_Num_Join(num);
}

void MainWindow::DrawCurve()
{
    m_scene->setToolType(tt_Curve);
}

void MainWindow::DrawLine()
{
    m_scene->setToolType(tt_Line);
}

void MainWindow::DrawOval()
{
    m_scene->setToolType(tt_Oval);
}

void MainWindow::DrawRec()
{
    m_scene->setToolType(tt_Rectangle);
}

void MainWindow::DrawTri()
{
    m_scene->setToolType(tt_Triangle);
}

void MainWindow::Rev()
{
    m_scene->undo();
}

void MainWindow::Del()
{
    //if(conn) conn->clearFigure(-1);
}

void MainWindow::join()
{
    if (dataRecvWS == Q_NULLPTR) {
        dataRecvWS = new QWebSocket();
        qDebug()<<"create websocket!";
        connect(dataRecvWS,&QWebSocket::disconnected,this,&MainWindow::onDisconnected);
        connect(dataRecvWS,&QWebSocket::textMessageReceived,this,&MainWindow::onTextReceived);
        connect(dataRecvWS,&QWebSocket::connected,this,&MainWindow::onConnected);
        connect(this,SIGNAL(joined(QString,int)),
                this,SLOT(onJoined(QString,int)));
        connect(this,SIGNAL(userLeft(QString,int)),
                this,SLOT(onUserLeft(QString,int)));
        connect(this,SIGNAL(figureAdded(QJsonObject)),
                this,SLOT(onFigureAdded(QJsonObject)));
        connect(this,SIGNAL(figureDeleted(int)),
                this,SLOT(onFigureDeleted(int)));
        connect(this,SIGNAL(figureCleared(int)),
                this,SLOT(onFigureCleared(int)));
//        connect(dataRecvWS,&QWebSocket::connected,this,&MainWindow::onSend);

        connect(_pTimer,SIGNAL(timeout()),this,SLOT(reconnect()),Qt::AutoConnection);
        dataRecvWS->open(QUrl("ws://198.148.99.145:8000/ws/join/50/"));
    }
//    if(!dataRecvWS)
//    {
//        conn = new NetConnect(this);
//        //m_conn->join(strName,"111.231.61.143",9001);
//        conn->join(strName,"127.0.0.1",9001);
    //    }
}

void MainWindow::dealMsg(QString recvMsg)
{
    QJsonDocument MsgJson = QJsonDocument::fromJson(recvMsg.toLocal8Bit().data());
    QJsonObject MsgObj = MsgJson.object();
    QString type = MsgObj.value("type").toString();
    if(type == "join_reply")
    {
        m_id = MsgObj.value("id").toInt();
        qDebug() << "join_repley name:" << m_name;

        QJsonArray figures = MsgObj.value("figures").toArray();
        for(auto it = figures.begin();it!=figures.end();it++)
        {
            emit figureAdded((*it).toObject());
        }
        emit joined(m_name,m_id);

    }
    else if(type == "user_joined")
    {
        QString name = MsgObj.value("name").toString();
        qDebug() <<"user_joined name" << name;
        //int id = obj["id"].toInt();
        int id = MsgObj.value("id").toInt();
        emit joined(name,id);
    }
    // else if(type == "user_left")
    else if(type == "user_left")
    {
        QString name = MsgObj.value("name").toString();
        //int id = obj["id"].toInt();
        int id = MsgObj.value("id").toInt();
        emit userLeft(name,id);
    }
    else if(type =="add")
    {
        auto figures = MsgObj.value("figure").toObject();
        emit figureAdded(figures);
    }
    else if(type =="delete")
    {
        auto global = MsgObj.value("global_id").toInt();
        emit figureDeleted(global);
    }
    else if(type =="clear")
    {
        auto owner = MsgObj.value("owner_id").toInt();
        emit figureCleared(owner);

    }
    else
    {
        qDebug() <<"类型的种类" <<type;
    }

}
void MainWindow::onSend(const QJsonObject &obj)
{
    QString msg = QString(QJsonDocument(obj).toJson());
    //QString msg = "{\"message\":\"12321\",\"yueyuea\":\"wgb\"}";
    //QString msg = "{\"figure\":{\"creator\":1,\"data\":{\"color\":4291572684,\"fill_color\":0,\"line_width\":2,\"points\":[56,278,172,352]},\"local_id\":12,\"type\":\"triangle\"},\"type\":\"add\"}";
    dataRecvWS->sendTextMessage(msg);
}


//QString getStringFromJsonObject(const QJsonObject& jsonObject){
//    return QString(QJsonDocument(jsonObject).toJson());
//}

//断开连接会触发这个槽函数
void MainWindow::onDisconnected()
{
    _pTimer->start(3000);
    qDebug("websocket is disconnected");
}
//连接成功会触发这个槽函数
void MainWindow::onConnected()
{
    _pTimer->stop();
    qDebug("connect successful");

}
//收到服务发来的消息会触发这个槽函数
void MainWindow::onTextReceived(QString msg)
{
    qDebug() << msg.toStdString().data();
    qDebug("textReceiveString");
    dealMsg(msg.toStdString().data());
}
//断开连接会启动定时器，触发这个槽函数重新连接
void MainWindow::reconnect()
{
    qDebug("websocket reconnected");
    dataRecvWS->abort();
    dataRecvWS->open(QUrl("ws://198.148.99.145:8000"));
}


void MainWindow::onJoined(QString name, int id)
{
    if(id == conn->id())
    {
        ui->l3 = nullptr;
        //preparePainterUI();
        m_scene->setUserId(id);

    }
    else
    {

    }
}

void MainWindow::onUserLeft(QString name, int id)
{
    if(id == conn->id())
    {
        m_scene = nullptr;
        removeToolBar(m_toolBar);
        //prepareJoinUI();
    }
    else
    {

    }
}

void MainWindow::onFigureAdded(const QJsonObject &figure)
{
    m_scene->onFigureAdded(figure);
}

void MainWindow::onFigureDeleted(int id)
{
    m_scene->onFigureDeleted(id);
}

void MainWindow::onFigureCleared(int ownerId)
{
    m_scene->onFigureCleared(ownerId);
}

void MainWindow::onErrorOccured(const QString &desc)
{
    //prepareJoinUI();
    if(conn)
    {
        conn->deleteLater();
        conn = nullptr;
    }
}

void MainWindow::onAddFigureReq(const QJsonObject &figure)
{
    if(conn) conn->addFigure(figure);
}

void MainWindow::onDeleteFigureReq(int id)
{
    if(conn) conn->deleteFigure(id);
}

void MainWindow::onClearFigureReq(int ownerId)
{
    if(conn) conn->clearFigure(ownerId);
}
