/********************************************************************************
** Form generated from reading UI file 'mainwindow.ui'
**
** Created by: Qt User Interface Compiler version 5.9.0
**
** WARNING! All changes made in this file will be lost when recompiling UI file!
********************************************************************************/

#ifndef UI_MAINWINDOW_H
#define UI_MAINWINDOW_H

#include <QtCore/QVariant>
#include <QtWidgets/QAction>
#include <QtWidgets/QApplication>
#include <QtWidgets/QButtonGroup>
#include <QtWidgets/QHeaderView>
#include <QtWidgets/QLabel>
#include <QtWidgets/QLineEdit>
#include <QtWidgets/QListWidget>
#include <QtWidgets/QMainWindow>
#include <QtWidgets/QPushButton>
#include <QtWidgets/QStatusBar>
#include <QtWidgets/QWidget>

QT_BEGIN_NAMESPACE

class Ui_MainWindow
{
public:
    QWidget *centralwidget;
    QLabel *jpg;
    QPushButton *button1;
    QPushButton *button2;
    QLabel *l1;
    QLabel *l2;
    QLabel *l3;
    QLineEdit *la;
    QLabel *lb;
    QPushButton *pushButton;
    QListWidget *back;
    QStatusBar *statusbar;

    void setupUi(QMainWindow *MainWindow)
    {
        if (MainWindow->objectName().isEmpty())
            MainWindow->setObjectName(QStringLiteral("MainWindow"));
        MainWindow->resize(762, 463);
        MainWindow->setMinimumSize(QSize(762, 463));
        MainWindow->setMaximumSize(QSize(16777215, 16777215));
        MainWindow->setStyleSheet(QStringLiteral(""));
        MainWindow->setTabShape(QTabWidget::Rounded);
        centralwidget = new QWidget(MainWindow);
        centralwidget->setObjectName(QStringLiteral("centralwidget"));
        jpg = new QLabel(centralwidget);
        jpg->setObjectName(QStringLiteral("jpg"));
        jpg->setGeometry(QRect(0, 0, 381, 441));
        button1 = new QPushButton(centralwidget);
        button1->setObjectName(QStringLiteral("button1"));
        button1->setGeometry(QRect(620, 240, 71, 71));
        button1->setAutoFillBackground(false);
        button1->setStyleSheet(QStringLiteral("background-image: url(:/jpg/create_meeting.jpg);"));
        button1->setCheckable(false);
        button1->setAutoDefault(false);
        button1->setFlat(true);
        button2 = new QPushButton(centralwidget);
        button2->setObjectName(QStringLiteral("button2"));
        button2->setGeometry(QRect(440, 240, 71, 70));
        button2->setAutoFillBackground(false);
        button2->setStyleSheet(QStringLiteral("background-image: url(:/jpg/join_meeting.jpg);"));
        button2->setFlat(true);
        l1 = new QLabel(centralwidget);
        l1->setObjectName(QStringLiteral("l1"));
        l1->setGeometry(QRect(440, 80, 251, 101));
        l2 = new QLabel(centralwidget);
        l2->setObjectName(QStringLiteral("l2"));
        l2->setGeometry(QRect(426, 330, 101, 16));
        l3 = new QLabel(centralwidget);
        l3->setObjectName(QStringLiteral("l3"));
        l3->setGeometry(QRect(605, 330, 101, 16));
        la = new QLineEdit(centralwidget);
        la->setObjectName(QStringLiteral("la"));
        la->setGeometry(QRect(430, 240, 270, 20));
        lb = new QLabel(centralwidget);
        lb->setObjectName(QStringLiteral("lb"));
        lb->setGeometry(QRect(430, 270, 101, 16));
        pushButton = new QPushButton(centralwidget);
        pushButton->setObjectName(QStringLiteral("pushButton"));
        pushButton->setGeometry(QRect(660, 240, 40, 20));
        back = new QListWidget(centralwidget);
        back->setObjectName(QStringLiteral("back"));
        back->setGeometry(QRect(0, 0, 771, 481));
        MainWindow->setCentralWidget(centralwidget);
        back->raise();
        button1->raise();
        button2->raise();
        l1->raise();
        l2->raise();
        l3->raise();
        la->raise();
        lb->raise();
        pushButton->raise();
        jpg->raise();
        statusbar = new QStatusBar(MainWindow);
        statusbar->setObjectName(QStringLiteral("statusbar"));
        MainWindow->setStatusBar(statusbar);

        retranslateUi(MainWindow);

        QMetaObject::connectSlotsByName(MainWindow);
    } // setupUi

    void retranslateUi(QMainWindow *MainWindow)
    {
        MainWindow->setWindowTitle(QApplication::translate("MainWindow", "MainWindow", Q_NULLPTR));
        jpg->setText(QApplication::translate("MainWindow", "<html><head/><body><p><img src=\":/jpg/home_bg.png\"/></p></body></html>", Q_NULLPTR));
        button1->setText(QString());
        button2->setText(QString());
        l1->setText(QApplication::translate("MainWindow", "<html><head/><body><p><span style=\" font-size:18pt; font-weight:600;\">\346\254\242\350\277\216\344\275\277\347\224\250\345\215\217\344\275\234\347\231\275\346\235\277</span></p></body></html>", Q_NULLPTR));
        l2->setText(QApplication::translate("MainWindow", "<html><head/><body><p><span style=\" font-weight:600;\">\345\214\277\345\220\215\345\212\240\345\205\245\347\231\275\346\235\277</span></p></body></html>", Q_NULLPTR));
        l3->setText(QApplication::translate("MainWindow", "<html><head/><body><p><span style=\" font-weight:600;\">\345\277\253\351\200\237\345\210\233\345\273\272\347\231\275\346\235\277</span></p></body></html>", Q_NULLPTR));
        lb->setText(QApplication::translate("MainWindow", "<html><head/><body><p><span style=\" font-weight:600;\">\350\257\267\350\276\223\345\205\245\346\210\277\351\227\264\345\217\267</span></p></body></html>", Q_NULLPTR));
        pushButton->setText(QApplication::translate("MainWindow", "\342\206\265", Q_NULLPTR));
    } // retranslateUi

};

namespace Ui {
    class MainWindow: public Ui_MainWindow {};
} // namespace Ui

QT_END_NAMESPACE

#endif // UI_MAINWINDOW_H
