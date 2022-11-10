#ifndef CLIENTCONNECTION_H
#define CLIENTCONNECTION_H

#include<QTcpSocket>
#include<QString>




class ClientConnection:public QTcpSocket
{

    Q_OBJECT
public:
    ClientConnection(QObject *parent = 0);
    ~ClientConnection();

    QString info();
    int id() {return m_id;}
    void resetState(){m_id = -1;}

    static int generateUserId();
    static int generateFigureId();


signals:
    void userJoined(QByteArray name, int id);
    void userLeft(QByteArray name,int id);

    void addFigureReq(const QJsonObject &figure);
    void deleteFigureReq(int globlId);
    void clearReq(int ownerId);

public slots:
    void onReadyRead();

protected:
    static int m_idBase;
    static int m_figureIdBase;
    QByteArray m_name;
    int m_id;

};




#endif // CLIENTCONNECTION_H
