#include "canvas.h"
#include "ui_canvas.h"
#include <windows.h>
#include <QtWidgets>
#include <QToolBar>
#include <QGraphicsScene>
#include <QGraphicsView>
#include <QtWidgets>

canvas::canvas(QWidget *parent) :
    QWidget(parent),
    ui(new Ui::canvas)
{
    ui->setupUi(this);
}

canvas::~canvas()
{
    delete ui;
}

void canvas::setNum(int num)
{
    QString numQ = QString::number(num+1);
    ui->label->setText("房间号:"+numQ);
}


void canvas::on_pushButton_pressed()
{
    ui->label->hide();
}

//void canvas::prepareUi()
//{
//    QToolBar *toolbar = addToolBar("Figure Type");
//    QActionGroup *actionGroup = new QActionGroup(toolbar);

//    m_toolBar = toolbar;

//    QAction *action = toolbar->addAction(QIcon(":/line.png"),
//                                         "Draw a Line",
//                                         this,SLOT(onDrawLineAction()));
//    action->setCheckable(true);
//    action->setChecked(true);
//    action->setActionGroup(actionGroup);

//    action = toolbar->addAction(QIcon(":/rect.png"),
//                                "Draw a Rectangle",
//                                this,SLOT(onDrawRectangleAction()));
//    action->setCheckable(true);
//    action->setActionGroup(actionGroup);

//    action = toolbar->addAction(QIcon(":/oval.png"),
//                                "Draw a Oval",this,SLOT(onDrawOvalAction()));
//    action->setCheckable(true);
//    action->setActionGroup(actionGroup);

//    action = toolbar->addAction(QIcon(":/triangle.png"),
//                                "Draw a Triangle",this,SLOT(onDrawTriangleAction()));
//    action->setCheckable(true);
//    action->setActionGroup(actionGroup);

//    action = toolbar->addAction(QIcon(":/pen.png"),
//                                "Draw as you like",this,SLOT(onDrawGraffitiAction()));
//    action->setCheckable(true);
//    action->setActionGroup(actionGroup);

//    toolbar->addSeparator();
//    action = toolbar ->addAction(QIcon(":/del.png"),
//                                 "Delete the Last",this,SLOT(onUnio()));
//    //action->setCheckable(true);
//    action->setActionGroup(actionGroup);


//    action = toolbar->addAction(QIcon(":/clear.png"),
//                                "Clear All",this,SLOT(onClearAll()));
//    //action->setCheckable(true);
//    action->setActionGroup(actionGroup);

//}

