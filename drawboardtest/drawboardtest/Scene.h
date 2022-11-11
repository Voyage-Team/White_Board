#ifndef SCENE_H
#define SCENE_H
#include<QGraphicsScene>
#include<QGraphicsSceneMouseEvent>
#include"shapes.h"
#include<QPen>
#include<QColor>
#include<list>
class QScene:public QGraphicsScene
{
    Q_OBJECT
public:
    QScene(QObject *parent = 0);
    ~QScene();
    void setToolType(int type);

    void setUserId(int id) { m_id = id; }
    void undo();

    void onFigureAdded(const QJsonObject &figure);
    void onFigureDeleted(int id);
    void onFigureCleared(int ownerId);
signals:
    void addFigureReq(const QJsonObject &figure);
    void deleteFigureReq(int id);
    void clearFigureReq(int ownerId);

protected:

    void mousePressEvent(QGraphicsSceneMouseEvent *event);
    void mouseMoveEvent(QGraphicsSceneMouseEvent *event);
    void mouseReleaseEvent(QGraphicsSceneMouseEvent *event);

public:
    int m_toolTyep;
    int m_id;
    Shapes *m_currentShape;

    std::list<Shapes *> m_shapes;

};

#endif // SCENE_H
