#include "shapes.h"

int Shapes::m_idBase = 0;
int Shapes::generateLocalId()
{
    return ++m_idBase;
}

//直线
Line::Line():Shapes(tt_Line),m_rcBounding(0,0,0,0)
{

}

void Line::setStartPoint(const QPointF &pos)
{
    setPos(pos);
    m_startPosScene = pos;
}

void Line::setEndPoint(const QPointF &pos)
{
    m_endPosScene = pos;
    qreal endx = m_endPosScene.x();
    qreal endy = m_endPosScene.y();
    qreal startx = m_startPosScene.x();
    qreal starty = m_startPosScene.y();
    m_rcBounding.setWidth(qAbs(endx-startx));
    m_rcBounding.setHeight(qAbs(endy-starty));

    QPointF startPoint;
    QPointF endPoint;

    if(endx < startx)
    {
        startx = endx;
        startPoint.setX(m_rcBounding.width());
        endPoint.setX(0);
    }
    else
    {
        startPoint.setX(0);
        endPoint.setX(m_rcBounding.width());
    }
    if(endy < starty)
    {
        starty = endy;
        startPoint.setY(m_rcBounding.height());
        endPoint.setY(0);
    }
    else
    {
        startPoint.setY(0);
        endPoint.setY(m_rcBounding.height());
    }

    m_line.setPoints(startPoint,endPoint);
    setPos(startx,starty);

}


void Line::setStrokeWidth(float w)
{
    m_strokeWidth = w;
    m_pen.setWidthF(w);

}


void Line::setStrokeColor(const QColor &color)
{
    m_strokeColor = color;
    m_pen.setColor(color);

}

QRectF Line::boundingRect() const
{
    return m_rcBounding;
}

void Line::paint(QPainter *painter, const QStyleOptionGraphicsItem *option, QWidget *widget)
{
    painter->save();
    painter->setPen(m_pen);
    painter->drawLine(m_line);
    painter->restore();
}

bool Line::isValid()
{
    return !m_line.isNull();
}

void Line::serialize(QJsonObject &obj)
{
    obj.insert("type",QJsonValue("line"));
    QJsonObject data;
    data.insert("color",QJsonValue((qint64)(m_strokeColor.rgba())));
    data.insert("line_width",QJsonValue(m_strokeWidth));
    data.insert("fill_color",QJsonValue((qint64)(m_fillColor.rgba())));
    QJsonArray points;
    points.append(QJsonValue(m_startPosScene.x()));
    points.append(QJsonValue(m_startPosScene.y()));
    points.append(QJsonValue(m_endPosScene.x()));
    points.append(QJsonValue(m_endPosScene.y()));
    data.insert("points",QJsonValue(points));
    obj.insert("data",QJsonValue(data));
}
//矩形
rRectangle::rRectangle(int type)
      :Shapes(type),m_rcBounding(0,0,0,0)
{

}

void rRectangle::setStartPoint(const QPointF &pos)
{
    setPos(pos);
    m_startPosScene = pos;
}

void rRectangle::setEndPoint(const QPointF &pos)
{
    m_endPosScene = pos;
    qreal endx = m_endPosScene.x();
    qreal endy = m_endPosScene.y();
    qreal startx = m_startPosScene.x();
    qreal starty = m_startPosScene.y();

    m_rcBounding.setWidth(qAbs(endx-startx));
    m_rcBounding.setHeight(qAbs(endy-starty));

    if(endx <startx)
    {
        startx = endx;
    }
    if (endy < starty)
    {
        starty = endy;
    }
    setPos(startx,starty);

}

void rRectangle::setStrokeWidth(float w)
{
    m_strokeWidth = w;
    m_pen.setWidthF(w);

}


void rRectangle::setStrokeColor(const QColor &color)
{
    m_strokeColor = color;
    m_pen.setColor(color);

}

void rRectangle::setFillColor(const QColor &color)
{
    m_fillColor = color;
}

QRectF rRectangle::boundingRect() const
{
    return m_rcBounding;
}

void rRectangle::paint(QPainter *painter, const QStyleOptionGraphicsItem *option, QWidget *widget)
{
    painter->save();
    if(m_strokeWidth > 0.1)
        painter->setPen(m_pen);
    else
        painter->setPen(Qt::NoPen);
    if(m_fillColor == Qt::transparent)
        painter->setBrush(Qt::NoBrush);
    else
        painter->setBrush(m_fillColor);
    painter->drawRect(m_rcBounding);
    painter->restore();

}

bool rRectangle::isValid()
{
    return m_rcBounding.width() >= 1 && m_rcBounding.height() >= 1;
}

void rRectangle::serialize(QJsonObject &obj)
{
    switch (m_type)
    {
    case tt_Rectangle:
        obj.insert("type",QJsonValue("rect"));
        break;
    case tt_Oval:
        obj.insert("type",QJsonValue("oval"));
        break;
    case tt_Triangle:
        obj.insert("type",QJsonValue("triangle"));
        break;
    default:
        return;
    }

    QJsonObject data;
    data.insert("color",QJsonValue((qint64)m_strokeColor.rgba()));
    data.insert("line_width",QJsonValue(m_strokeWidth));
    data.insert("fill_color",QJsonValue((qint64)m_fillColor.rgba()));
    QJsonArray points;
    points.append(QJsonValue(m_startPosScene.x()));
    points.append(QJsonValue(m_startPosScene.y()));
    points.append(QJsonValue(m_endPosScene.x()));
    points.append(QJsonValue(m_endPosScene.y()));
    data.insert("points",QJsonValue(points));
    obj.insert("data",QJsonValue(data));

}

//椭圆
 Oval:: Oval() :rRectangle(tt_Oval)
{

}

void  Oval::paint(QPainter *painter, const QStyleOptionGraphicsItem *option, QWidget *widget)
{
    painter->save();
    if(m_strokeWidth > 0.1)
        painter->setPen(m_pen);
    else
        painter->setPen(Qt::NoPen);
    if(m_fillColor == Qt::transparent)
        painter->setBrush(Qt::NoBrush);
    else
        painter->setBrush(m_fillColor);
    painter->drawEllipse(m_rcBounding);
    painter->restore();
}

//三角形
Triangle::Triangle():rRectangle(tt_Triangle)
{

}

void Triangle::paint(QPainter *painter, const QStyleOptionGraphicsItem *option, QWidget *widget)
{
    painter->save();
    if(m_strokeWidth > 0.1)
        painter->setPen(m_pen);
    else
        painter->setPen(Qt::NoPen);
    if(m_fillColor == Qt::transparent)
        painter->setBrush(Qt::NoBrush);
    else
        painter->setBrush(m_fillColor);

    QPointF points[3] = {
        m_rcBounding.bottomLeft(),
        m_rcBounding.bottomRight(),
        QPointF(m_rcBounding.width() / 2,0)

    };
    painter->drawPolygon(points,3);
    painter->restore();
}

//曲线
Curve::Curve()
    :Shapes(tt_Curve),m_rcBounding(0,0,0,0)
{

}

void Curve::setStartPoint(const QPointF &pos)
{
    setPos(pos);
    m_startPosScene = pos;
    m_path.moveTo(pos);

}


void Curve::setEndPoint(const QPointF &pos)
{
    m_path.lineTo(pos);
    m_rcBounding = m_path.boundingRect();
    m_topLeftInScene = m_rcBounding.topLeft();
    setPos(m_topLeftInScene);
    m_rcBounding.moveTo(0,0);
}


void Curve::setStrokeWidth(float w)
{
    m_strokeWidth = w;
    m_pen.setWidth(w);

}

void Curve::setStrokeColor(const QColor &color)
{
    m_strokeColor = color;
    m_pen.setColor(color);
}

QRectF Curve::boundingRect() const
{
    return m_rcBounding;
}

void Curve::paint(QPainter *painter, const QStyleOptionGraphicsItem *option, QWidget *widget){
    painter->save();
    painter->setPen(m_pen);
    QPainterPath path = m_path.translated(-m_topLeftInScene);
    painter->drawPath(path);
    painter->restore();
}

void Curve::setPath(QPainterPath &path)
{
    m_path = path;
    m_rcBounding = m_path.boundingRect();
    m_topLeftInScene = m_rcBounding.topLeft();
    setPos(m_topLeftInScene);
    m_rcBounding.moveTo(0,0);

}

bool Curve::isValid()
{
    return !m_path.isEmpty();
}


void Curve::serialize(QJsonObject &obj)
{
    obj.insert("type",QJsonValue("curve"));
    QJsonObject data;
    data.insert("color",QJsonValue((qint64)m_strokeColor.rgba()));
    data.insert("line_width",QJsonValue(m_strokeWidth));

    QJsonArray points;
    int ptCount = m_path.elementCount();
    QPainterPath::Element e;
    for(int i= 0;i < ptCount; i++)
    {
        e = m_path.elementAt(i);
        points.append(QJsonValue(e.x));
        points.append(QJsonValue(e.y));
    }

    data.insert("points",QJsonValue(points));
    obj.insert("data",QJsonValue(data));


}


