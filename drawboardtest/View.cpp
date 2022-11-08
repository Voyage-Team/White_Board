#include "View.h"

View::View(QGraphicsScene *scene, QWidget *parent)
   :QGraphicsView(scene,parent)
{
    setRenderHint(QPainter::Antialiasing,true);//渲染指示,抗锯齿

}

void View::resizeEvent(QResizeEvent *event)
{
    QGraphicsView::resizeEvent(event);
    const QSize &size = event->size();
    QGraphicsScene *s = scene();
    if(NULL  !=s )
    {
        QRectF rc(0,0,size.width(),size.height());
        setSceneRect(rc);
        s->setSceneRect(rc);

    }

}
