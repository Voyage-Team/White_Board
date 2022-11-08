#ifndef VIEW_H
#define VIEW_H
#include<QGraphicsView>
#include<QtWidgets>
class  View:public QGraphicsView
{
public:
     View(QGraphicsScene *scene,QWidget *parent = 0);
protected:
     void resizeEvent(QResizeEvent *event);//窗口大小、位置及其大小改变引起的事件QResizeEvent
};

#endif // VIEW_H
