#include <kernel.h>
#include <QObject>

Kernel::Kernel(QObject *parent) : QObject(parent)
{
    srand(10);
    mwd = new MainWindow;
    mwd->showNormal();
    connect(mwd, SIGNAL(SIG_Num_Join(int)),this,SLOT(slot_Num_Join(int)));
    connect(mwd, SIGNAL(SIG_Num_Create(int)),this,SLOT(slot_Num_Create(int)));
    //canvass = new canvas;
//    canvas22 = new Canvas2;
//    canvas22->prepareUi();
    //mwd->prepareCanvasUi();
}
Kernel::~Kernel()
{
    if(mwd) {
        mwd->hide();
        delete mwd;
        mwd = NULL;
    }
//    if(canvas22) {
//        canvas22->hide();
//        delete canvas22;
//        canvas22 = NULL;
//    }

}

void Kernel::slot_Num_Join(int num)
{
    mwd->hideUi2();
    mwd->prepareCanvas();
    //mwd->hide();
    //canvas22->showNormal();
//    canvas22->prepareUi();
//    connect(canvas22, SIGNAL(SIG_rev()),this,SLOT(Rev));
//    connect(canvas22, SIGNAL(SIG_DrawCur()),this,SLOT(DrawCurve));
//    connect(canvas22, SIGNAL(SIG_DrawLine()),this,SLOT(DrawLine));
//    connect(canvas22, SIGNAL(SIG_DrawOval()),this,SLOT(DrawOval));
//    connect(canvas22, SIGNAL(SIG_DrawRec()),this,SLOT(DrawRec));
//    connect(canvas22, SIGNAL(SIG_DrawTri()),this,SLOT(DrawTri));
}

void Kernel::slot_Num_Create(int numCreate)
{
    mwd->hideUi1();
    mwd->prepareCanvas();
    // mwd->destroyed();
//    canvas22 = new Canvas2;
//    // canvas22->prepareUi();
//    canvas22->showNormal();
//    canvas22->prepareUi();
//    canvas22->setNum(numCreate);
//    canvas22->prepareUi();
//    connect(canvas22, SIGNAL(SIG_rev()),this,SLOT(Rev));
//    connect(canvas22, SIGNAL(SIG_DrawCur()),this,SLOT(DrawCurve));
//    connect(canvas22, SIGNAL(SIG_DrawLine()),this,SLOT(DrawLine));
//    connect(canvas22, SIGNAL(SIG_DrawOval()),this,SLOT(DrawOval));
//    connect(canvas22, SIGNAL(SIG_DrawRec()),this,SLOT(DrawRec));
//    connect(canvas22, SIGNAL(SIG_DrawTri()),this,SLOT(DrawTri));

}
