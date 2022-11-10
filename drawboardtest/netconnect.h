#ifndef NETCONNECT_H
#define NETCONNECT_H



#include<QTcpSocket>
class NetConnect : public QTcpSocket
{
    Q_OBJECT
public:
    NetConnect(QObject *parent = 0);
    ~NetConnect();

    void join(QString name,QString host,int port);
    void left();

    int id() {return m_id;}

    void addFigure(const QJsonObject &figure);
    void deleteFigure(int id);
    void clearFigure(int ownerId);


signals:
    void joined(QString name,int id);
    void userLeft(QString name,int id);

    void figureAdded(const QJsonObject &figure);
    void figureDeleted(int id);
    void figureCleared(int ownerId);
    void errorOccured(const QString &desc);

protected slots:
    void onConnected();
    void onReadyRead();
    void onError(QAbstractSocket::SocketError sock);


protected:
    QString m_name;
    int m_id;

};


#endif // NETCONNECT_H
