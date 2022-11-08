#include "dialog.h"
#include <QApplication>
#include <synchapi.h>
#include <QMutex>
#include <QWaitCondition>

int main(int argc, char *argv[])
{
    QApplication a(argc, argv);
    Dialog w;
    w.show();
    //while(1) Sleep(100);
    QMutex mutex;
    QWaitCondition sleep;
    mutex.lock();
    sleep.wait(&mutex, 5000);
    mutex.unlock();

    return a.exec();
}
