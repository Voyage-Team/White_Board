#ifndef DIALOG_H
#define DIALOG_H

#include <QDialog>
#include <QWebSocket>
#include <QTimer>

QT_BEGIN_NAMESPACE
namespace Ui { class Dialog; }
QT_END_NAMESPACE

class Dialog : public QDialog
{
    Q_OBJECT

public:
    Dialog(QWidget *parent = nullptr);
    ~Dialog();

public slots:
    void createDataRecvWS();    /*-<创建websocket连接 */

private:
    Ui::Dialog *ui;
    QWebSocket *dataRecvWS;     /*-<websocket类 */
    QTimer* _pTimer;


private slots:
    void onConnected();                 /*-<socket建立成功后，触发该函数 */
    void onTextReceived(QString msg);   /*-<收到Sev端的数据时，触发该函数 */
    void onDisconnected();             /*-<socket连接断开后，触发该函数 */
    void reconnect();
};
#endif // DIALOG_H
