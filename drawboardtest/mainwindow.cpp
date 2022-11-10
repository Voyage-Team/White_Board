#include "mainwindow.h"
#include "ui_mainwindow.h"
#include <QVBoxLayout>
#include <QToolBar>


MainWindow::MainWindow(QWidget *parent)
    : QMainWindow(parent)
    , ui(new Ui::MainWindow)
{
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
    Del();
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
//    connect(this, SIGNAL(SIG_rev()),this,SLOT(Rev()));
//    connect(this, SIGNAL(SIG_DrawCur()),this,SLOT(DrawCurve()));
//    connect(this, SIGNAL(SIG_DrawLine()),this,SLOT(DrawLine()));
//    connect(this, SIGNAL(SIG_DrawOval()),this,SLOT(DrawOval()));
//    connect(this, SIGNAL(SIG_DrawRec()),this,SLOT(DrawRec()));
//    connect(this, SIGNAL(SIG_DrawTri()),this,SLOT(DrawTri()));

//    m_scene = new QScene;
//    View *vview = new View(m_scene);
//    setCentralWidget(vview);
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

    connect(m_scene,SIGNAL(addFigureReq(QJsonObject)),
            this,SLOT(onAddFigureReq(QJsonObject)));
    connect(m_scene,SIGNAL(deletFigureReq(int)),
            this,SLOT(onDeleteFigureReq(int)));
    connect(m_scene,SIGNAL(clearFigureReq(int)),
            this,SLOT(onClearFigureReq(int)));

    setCentralWidget(vieww);
    Join();
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
    if(conn) conn->clearFigure(-1);
}

void MainWindow::Join()
{
    if(!conn)
    {
        conn = new NetConnect(this);
        QString  strName = ui->la->text();
        connect(conn,SIGNAL(joined(QString,int)),
                this,SLOT(onJoined(QString,int)));
        connect(conn,SIGNAL(userLeft(QString,int)),
                this,SLOT(onUserLeft(QString,int)));
        connect(conn,SIGNAL(figureAdded(QJsonObject)),
                this,SLOT(onFigureAdded(QJsonObject)));
        connect(conn,SIGNAL(figureDeleted(int)),
                this,SLOT(onFigureDeleted(int)));
        connect(conn,SIGNAL(figureCleared(int)),
                this,SLOT(onFigureCleared(int)));
        //m_conn->join(strName,"111.231.61.143",9001);

        conn->join(strName,"127.0.0.1",9001);

    }
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
