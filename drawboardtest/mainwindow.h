#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>
#include <QObject>
#include <QDialog>
#include <QVBoxLayout>
#include "QMessageBox"
#include <cstdlib>
#include "Scene.h"
#include "View.h"
#include "netconnect.h"

QT_BEGIN_NAMESPACE
namespace Ui { class MainWindow; }
QT_END_NAMESPACE

class MainWindow : public QMainWindow
{
    Q_OBJECT
signals:
    //房间号信号
    void SIG_Num_Join(int num);
    void SIG_Num_Create(int numCreate);
public:
    MainWindow(QWidget *parent = nullptr);
    ~MainWindow();
    void hideUi1();
    void hideUi2();
    void prepareCanvas();
    void closeEvent(QCloseEvent *event);
    void Join();
private slots:

    void on_button2_clicked();

    void on_button1_clicked();

    void on_pushButton_clicked();
public slots:
    void DrawCurve();
    void DrawLine();
    void DrawOval();
    void DrawRec();
    void DrawTri();
    void Rev();
    void Del();


    void onJoined(QString name,int id);
    void onUserLeft(QString name,int id);

    void onFigureAdded(const QJsonObject &figure);
    void onFigureDeleted(int id);
    void onFigureCleared(int ownerId);
    void onErrorOccured(const QString &desc);

    void onAddFigureReq(const QJsonObject &figure);
    void onDeleteFigureReq(int id);
    void onClearFigureReq(int ownerId);
signals:
    void SIG_DrawLine();
    void SIG_DrawRec();
    void SIG_DrawOval();
    void SIG_DrawTri();
    void SIG_DrawCur();
    void SIG_rev();
    void SIG_del();

private:


private:
    Ui::MainWindow *ui;
    QToolBar *m_toolBar;
    QScene* m_scene;
    View *vview;
    NetConnect *conn;
};
#endif // MAINWINDOW_H
