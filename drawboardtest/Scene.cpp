#include "Scene.h"
#include <QDebug>
#include "View.h"
QScene::QScene(QObject *parent)
    :QGraphicsScene(parent)
    ,m_id(-1)
    ,m_toolTyep(tt_Line)
    ,m_currentShape(nullptr)
{

}

void QScene::setToolType(int type)
{
    m_toolTyep = type;
    if(m_currentShape != nullptr)
    {
        if(!m_currentShape->isValid())
        {
            delete m_currentShape;
        }
        m_currentShape = nullptr;
    }

}

QScene :: ~QScene()
{

}

void QScene::onFigureAdded(const QJsonObject &figure)
{
    qDebug() << "PainterScene::onFigureAdded";
    Shapes *item = nullptr;
    QJsonObject data = figure.value("data").toObject();
    QJsonArray points = data.value("points").toArray();
    QString strTyep = figure.value("type").toString();

    int creatorId = figure.value("creator").toInt();
    int localId = figure.value("local_id").toInt();
    int globalId = figure.value("global_id").toInt();


    if(creatorId == m_id)
    {
        auto it = std::find_if(m_shapes.begin(),m_shapes.end()
                               ,[=](Shapes *s){
            return (s->creator() == creatorId && s->localId() == localId);

        });

        if(it != m_shapes.end())
        {
            qDebug() <<"udpata figure global id";
            (*it)->setGlocalId(globalId);
            return ;
        }
    }

/*#define SET_START_AND_END_POS()
    QPointF startPos(points[0].toInt(),points[1].toInt());
    QPointF endPos(points[2].toInt(),points[3].toInt());
    item->setStartPoit(startPos);
    item->setEndPoint(endPos)*/

    if(strTyep =="line")
    {
        item = new Line();
        QPointF startPos(points[0].toInt(),points[1].toInt());
        QPointF endPos(points[2].toInt(),points[3].toInt());
        item->setStartPoint(startPos);
        item->setEndPoint(endPos);
    }
    else if (strTyep =="rect")
    {
        item = new rRectangle();
        QPointF startPos(points[0].toInt(),points[1].toInt());
        QPointF endPos(points[2].toInt(),points[3].toInt());
        item->setStartPoint(startPos);
        item->setEndPoint(endPos);

    }
    else if(strTyep == "oval")
    {
        item = new  Oval();
        QPointF startPos(points[0].toInt(),points[1].toInt());
        QPointF endPos(points[2].toInt(),points[3].toInt());
        item->setStartPoint(startPos);
        item->setEndPoint(endPos);

    }

    else if(strTyep == "triangle")
    {
        item = new Triangle();
        QPointF startPos(points[0].toInt(),points[1].toInt());
        QPointF endPos(points[2].toInt(),points[3].toInt());
        item->setStartPoint(startPos);
        item->setEndPoint(endPos);
    }

    else if(strTyep == "curve")
    {
        Curve *curve = new Curve();
        item = curve;

        QPainterPath path;
        int size  = points.size();
        path.moveTo(points[0].toInt(),points[1].toInt());
        for(int i= 2 ;i < size;i += 2)
        {
            path.lineTo(points[i].toInt(),points[i+1].toInt());
        }
        curve->setPath(path);

    }
    else
    {
        qDebug() << "unknow figure type";
        return;
    }

    item->setGlocalId(globalId);
    item->setLocalId(localId);
    item->setStrokeWidth(data.value("line_width").toInt());
    item->setStrokeColor(QColor::fromRgba((unsigned int) data.value("color").toDouble()));
    item->setFillColor(QColor::fromRgba((unsigned int) data.value("fill_color").toDouble()));

    addItem(item);
    m_shapes.push_back(item);
    update();

}

void QScene::onFigureDeleted(int id)
{
    qDebug() <<"PainterScene::onFigureDeleted";
    auto it = std::find_if(m_shapes.begin(),m_shapes.end(),
                           [=](Shapes *s){
        return s->globalId() == id;

    });

    if(it != m_shapes.end())
    {
        qDebug() <<"Painter Scene::onFigureDeleted,globalid -" <<id;
        removeItem(*it);
        delete *it;
        m_shapes.erase(it);
        update();
    }
}

void QScene::onFigureCleared(int ownerId)
{
        qDebug() <<"PainterScene::onFigureCleared";
        qDebug() << "ownerID =" << ownerId;
        if(ownerId == -1)
        {
            clear();
            m_shapes.clear();
            update();
            qDebug() << "ownerID == -1";
        }
        else
        {
           for(auto it = m_shapes.begin();it!= m_shapes.end();)
           {

               if((*it)->creator() == ownerId)
               {
                   removeItem(*it);
                   delete *it;
                   m_shapes.erase(it);
               }
               else
                   it++;

           }
        }
}

void QScene::undo()
{
    if(m_shapes.size())
    {
        Shapes *item = m_shapes.back();
        emit deleteFigureReq(item->globalId());
    }
}


void QScene::mousePressEvent(QGraphicsSceneMouseEvent *event)
{
    QGraphicsScene::mousePressEvent(event);
    if(event->button() != Qt::LeftButton) return ;
    if(!event->isAccepted())
    {
        switch (m_toolTyep) {
        case tt_Line:
            m_currentShape = new Line();
            m_currentShape->setStrokeColor(Qt::black);
            m_currentShape->setStrokeWidth(2);
            break;
        case tt_Rectangle:
            m_currentShape = new rRectangle();
            m_currentShape->setStrokeWidth(2);
            break;
        case tt_Oval:
            m_currentShape = new  Oval();
            m_currentShape->setStrokeWidth(2);
            //m_currentShape->setFillColor(Qt::red);
            break;
        case tt_Triangle:
            m_currentShape = new Triangle();
            m_currentShape->setStrokeWidth(2);
            m_currentShape->setStrokeColor(QColor::fromRgbF(0.8f,0.2f,0.8f));

            break;
        case tt_Curve:
            m_currentShape = new Curve();
            m_currentShape->setStrokeWidth(3);
            m_currentShape->setStrokeColor(QColor::fromRgbF(0.9f,0.1f,0.2f));
            break;
        default:
            return ;
        }
        if(m_currentShape == nullptr) return;
        addItem(m_currentShape);
        m_currentShape->setCreator(m_id);
        m_currentShape->setStartPoint(event->scenePos());
    }
}

void QScene::mouseMoveEvent(QGraphicsSceneMouseEvent *event)
{

    QGraphicsScene::mouseMoveEvent(event);
    if(!event->isAccepted() && m_currentShape)
    {
        m_currentShape->setEndPoint(event->scenePos());
        update();
    }

}

void QScene::mouseReleaseEvent(QGraphicsSceneMouseEvent *event)
{


    QGraphicsScene::mouseReleaseEvent(event);
    if(event->button() != Qt::LeftButton) return ;
    if(!event->isAccepted() && m_currentShape)
    {
        if(m_currentShape->isValid())
        {
            m_shapes.push_back(m_currentShape);
            QJsonObject figure;
            m_currentShape->serialize(figure);
            figure.insert("creator",QJsonValue(m_id));
            figure.insert("local_id",QJsonValue(m_currentShape->localId()));
//            QJsonObject total;
//            total.insert("figure:",QJsonValue(figure));
//            total.insert("opt:","add");
            figure.insert("opt","add");
            emit addFigureReq(figure);

        }
        else
        {
            removeItem(m_currentShape);
            delete m_currentShape;
        }
        m_currentShape = nullptr;
    }
}


