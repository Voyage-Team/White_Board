#ifndef SHAPES_H
#define SHAPES_H

#include<QtWidgets>
#include<QPen>
#include<QColor>
enum ToolType {
    tt_Line = 1,
    tt_Curve,
    tt_Rectangle,
    tt_Oval,
    tt_Triangle
};

class Shapes: public QGraphicsItem
{
    // Q_OBJECT
public:
    Shapes(int type):m_type(type)
      ,m_strokeColor(Qt::black)
      ,m_strokeWidth(1.0f)
      ,m_fillColor(Qt::transparent)
      ,m_creatorId(-1)
      ,m_globalId(-1)
      ,m_localId(generateLocalId())

    {}


    virtual ~Shapes(){}
    virtual void setStartPoint(const QPointF &pos)  =0;
    virtual void setEndPoint(const QPointF &pos) =0;
    virtual void setStrokeWidth(float w) {m_strokeWidth = w;}
    virtual void setStrokeColor(const QColor &color) {m_strokeColor = color;}
    virtual void setFillColor(const QColor &color) {m_fillColor = color;}
    virtual bool isValid(){return true;}

    virtual void serialize(QJsonObject &obj)  = 0;
    static int generateLocalId();

    void setCreator(int id){m_creatorId = id;}
    int creator(){return m_creatorId;}

    void setGlocalId(int id){m_globalId = id;}
    int globalId(){return m_globalId;}

    void setLocalId(int id){m_localId = id;}
    int localId(){return m_localId;}


protected:
    int m_type;
    float m_strokeWidth;//线宽
    QColor m_strokeColor; //线颜色
    QColor m_fillColor;//填充颜色
    static int m_idBase;
    int  m_globalId;
    int m_localId;
    int m_creatorId;

};

class Line:public Shapes{
public:
    Line();
    QRectF boundingRect() const ;
    void paint(QPainter *painter,const QStyleOptionGraphicsItem *option ,QWidget *widget);


    void setStartPoint(const QPointF &pos);
    void setEndPoint(const QPointF &pos);
    void setStrokeWidth(float w);
    void setStrokeColor(const QColor &color);

    bool isValid() ;//检查对象变量是否已经实例化
    void serialize(QJsonObject &obj);//封装信息

public:
    QPointF m_startPosScene;
    QPointF m_endPosScene;
    QLineF m_line;
    QRectF m_rcBounding;
    QPen m_pen;
};


class rRectangle:public Shapes
{
public:
    rRectangle(int type = tt_Rectangle);
    QRectF boundingRect() const;
    void paint(QPainter *painter,const QStyleOptionGraphicsItem *option ,QWidget *widget);


    void setStartPoint(const QPointF &pos);
    void setEndPoint(const QPointF &pos);
    void setStrokeWidth(float w);
    void setStrokeColor(const QColor &color);
    void setFillColor(const QColor &color);
    void serialize(QJsonObject &obj);
//    QJsonObject serialize(QJsonObject &obj);
    bool isValid();//检查对象变量是否已经实例化

public:
    QPointF m_startPosScene;//qreal(double)
    QPointF m_endPosScene;//QPoint类的主要功能是定义了平面上的一个点的坐标，数据类型为int类型，如果想要float类型就需要QPointF。

    QRectF m_rcBounding;
    QPen m_pen;

};

class  Oval :public rRectangle
{
public:
    Oval();
    void paint(QPainter *painter,const QStyleOptionGraphicsItem *option ,QWidget *widget);

};

class Triangle:public rRectangle
{
public:
    Triangle();
    void paint(QPainter *painter,const QStyleOptionGraphicsItem *option ,QWidget *widget);
};


class Curve:public Shapes
{
public:
    Curve();

    QRectF boundingRect() const ;//计算轮廓的垂直边界最小矩形，矩形是与图像上下边界平行的
    void paint(QPainter *painter,const QStyleOptionGraphicsItem *option ,QWidget *widget);


    void setStartPoint(const QPointF &pos);
    void setEndPoint(const QPointF &pos);
    void setStrokeWidth(float w);
    void setStrokeColor(const QColor &color);

    void serialize(QJsonObject &obj);
    bool isValid();//检查对象变量是否已经实例化
    void setPath(QPainterPath &path);

public:
    QPointF m_startPosScene;
    QPointF m_endPosScene;
    QRectF m_rcBounding;
    QPen m_pen;
    QPainterPath m_path;
    QPointF m_topLeftInScene;

};

#endif // SHAPES_H
