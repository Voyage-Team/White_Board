#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>
#include <QObject>
#include <QDialog>
#include <QVBoxLayout>
#include "QMessageBox"
#include <cstdlib>

QT_BEGIN_NAMESPACE
namespace Ui { class MainWindow; }
QT_END_NAMESPACE

class MainWindow : public QMainWindow
{
    Q_OBJECT
signals:
    //房间号信号
    void SIG_Num(int num);
    void SIG_NumCreate(int numCreate);
public:
    MainWindow(QWidget *parent = nullptr);
    ~MainWindow();
    void prepareCanvasUi();

private slots:

    void on_button2_clicked();

    void on_button1_clicked();

    void on_pushButton_clicked();


private:
    Ui::MainWindow *ui;
    QToolBar *m_toolBar;
};
#endif // MAINWINDOW_H
