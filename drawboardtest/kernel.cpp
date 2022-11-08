#include <kernel.h>
#include <QObject>

Kernel::Kernel(QObject *parent) : QObject(parent)
{
    srand(10);
    mwd = new MainWindow;
    mwd->showNormal();
    connect(mwd, SIGNAL(SIG_Num(int)),this,SLOT(slot_Num(int)));
    connect(mwd, SIGNAL(SIG_NumCreate(int)),this,SLOT(slot_NumCreate(int)));
    canvass = new canvas;
    mwd->prepareCanvasUi();
}
Kernel::~Kernel()
{
    if(mwd) {
        mwd->hide();
        delete mwd;
        mwd = NULL;
    }
    if(canvass) {
        canvass->hide();
        delete canvass;
        canvass = NULL;
    }

}

void Kernel::slot_Num(int num)
{
    mwd->hide();
    canvass->showNormal();
}

void Kernel::slot_NumCreate(int numCreate)
{
    mwd->hide();
    canvass->showNormal();
    canvass->setNum(numCreate);
}
