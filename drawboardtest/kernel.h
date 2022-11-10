#ifndef KERNEL_H
#define KERNEL_H


#include <QObject>
#include <mainwindow.h>
#include "canvas.h"
#include <QMainWindow>
#include <QDialog>
#include <QVBoxLayout>
#include <QWidget>
#include "canvas2.h"
#include "Scene.h"
#include "View.h"


class Kernel;//不用包含头文件，直接声明
//定义函数指针
typedef void (Kernel::*FUN)(char* buf, int nLen);

class Kernel : public QObject
{
    Q_OBJECT
public:
    explicit Kernel(QObject *parent = 0);
    ~Kernel();
signals:

public slots:
    void slot_Num_Join(int num);//输入房间号处理
    void slot_Num_Create(int numCreate);//新建房间

private:

    MainWindow* mwd;
    canvas* canvass;
    Canvas2* canvas22;
    int numDefault[100];
    QScene *m_scene;

};

#endif // KERNEL_H
