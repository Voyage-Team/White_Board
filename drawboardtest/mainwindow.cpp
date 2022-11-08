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

}

MainWindow::~MainWindow()
{
    delete ui;
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
    Q_EMIT SIG_NumCreate(numC);

}


void MainWindow::on_pushButton_clicked()
{
    QString numQ = ui->la->text();
    int num = numQ.toInt();
    Q_EMIT SIG_Num(num);
//    if(num == "1"){
//        dialog = new Dialog111;
//        dialog->showNormal();
//    } else{
//         QMessageBox::critical(this, "提示", "房间号不存在");
//         ui->button1->show();
//         ui->button2->show();
//         //ui->l1->hide();
//         ui->l2->show();
//         ui->l3->show();
//         ui->la->hide();
//         ui->lb->hide();
//         ui->pushButton->hide();
    //    }
}

void MainWindow::prepareCanvasUi()
{
    QToolBar *toolbar = addToolBar("Figure Type");
    QActionGroup *actionGroup = new QActionGroup(toolbar);

    m_toolBar = toolbar;

    QAction *action = toolbar->addAction(QIcon(":/line.png"),
                                         "Draw a Line",
                                         this,SLOT(onDrawLineAction()));
    action->setCheckable(true);
    action->setChecked(true);
    action->setActionGroup(actionGroup);

    action = toolbar->addAction(QIcon(":/rect.png"),
                                "Draw a Rectangle",
                                this,SLOT(onDrawRectangleAction()));
    action->setCheckable(true);
    action->setActionGroup(actionGroup);

    action = toolbar->addAction(QIcon(":/oval.png"),
                                "Draw a Oval",this,SLOT(onDrawOvalAction()));
    action->setCheckable(true);
    action->setActionGroup(actionGroup);

    action = toolbar->addAction(QIcon(":/triangle.png"),
                                "Draw a Triangle",this,SLOT(onDrawTriangleAction()));
    action->setCheckable(true);
    action->setActionGroup(actionGroup);

    action = toolbar->addAction(QIcon(":/pen.png"),
                                "Draw as you like",this,SLOT(onDrawGraffitiAction()));
    action->setCheckable(true);
    action->setActionGroup(actionGroup);

    toolbar->addSeparator();
    action = toolbar ->addAction(QIcon(":/del.png"),
                                 "Delete the Last",this,SLOT(onUnio()));
    //action->setCheckable(true);
    action->setActionGroup(actionGroup);


    action = toolbar->addAction(QIcon(":/clear.png"),
                                "Clear All",this,SLOT(onClearAll()));
    //action->setCheckable(true);
    action->setActionGroup(actionGroup);

}

