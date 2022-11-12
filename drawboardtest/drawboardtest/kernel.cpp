#include <kernel.h>
#include <QObject>

Kernel::Kernel(QObject *parent) : QObject(parent)
{
    srand(10);
    _pTimer = new QTimer;
    dataRecvWS = Q_NULLPTR;
    mwd = new MainWindow;
    mwd->showNormal();
    connect(mwd, SIGNAL(SIG_Num_Join(QString)),this,SLOT(slot_Websocket_Join(QString)));
    connect(mwd, SIGNAL(SIG_Num_Create(int)),this,SLOT(slot_Websocket_Create(int)));
}
Kernel::~Kernel()
{
    if(mwd) {
        mwd->hide();
        delete mwd;
        mwd = NULL;
    }
}

void Kernel::slot_Websocket_Join(QString num)
{
    mwd->hideUi2();
    mwd->join(num);

    mwd->prepareCanvas();
}

void Kernel::slot_Websocket_Create(int numCreate)
{
    mwd->hideUi1();
    mwd->create();
    mwd->prepareCanvas();
}
