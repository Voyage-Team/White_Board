#include "mainwindow.h"

#include <QApplication>
#include <kernel.h>

int main(int argc, char *argv[])
{
    QApplication a(argc, argv);
    //MainWindow w;
    //w.show();
    Kernel kernel;
//    QJsonObject qobj;
//    qobj.insert("obj:","add");
//    QJsonObject total;
//    total.insert("figure:",QJsonValue(qobj));
//    total.insert("otp","add");
//    qDebug() <<total;
//    QString type = total.value("obj:").toString();
//    if(type == "add")
//    {
//        qDebug("add");
//    } else {
//        qDebug("no");
//    }
    return a.exec();
}
