#include "mainwindow.h"

#include <QApplication>
#include <kernel.h>

int main(int argc, char *argv[])
{
    QApplication a(argc, argv);
    //MainWindow w;
    //w.show();
    Kernel kernel;
    return a.exec();
}
