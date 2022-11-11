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
#include <QWebSocket>


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
    void joined(QString name,int id);
    void userLeft(QString name,int id);

    void figureAdded(const QJsonObject &figure);
    void figureDeleted(int id);
    void figureCleared(int ownerId);
    void errorOccured(const QString &desc);
public:
    MainWindow(QWidget *parent = nullptr);
    ~MainWindow();
    void hideUi1();
    void hideUi2();
    void prepareCanvas();
    void closeEvent(QCloseEvent *event);
    void join();
    void dealMsg(QString recvMsg);
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

    void onConnected();                 //socket建立成功后，触发该函数
    void onTextReceived(QString msg);   //收到Sev端的数据时，触发该函数
    void onDisconnected();              //socket连接断开后，触发该函数
    void reconnect();
    void onSend(const QJsonObject &figure);


private:


private:
    Ui::MainWindow *ui;
    QToolBar *m_toolBar;
    QScene* m_scene;
    View *vview;
    NetConnect *conn;
    QWebSocket *dataRecvWS;
    QTimer* _pTimer;
    QString m_name;
    int m_id;
};
#endif // MAINWINDOW_H
