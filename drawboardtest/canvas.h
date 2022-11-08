#ifndef CANVAS_H
#define CANVAS_H

#include <QWidget>
#include <QToolBar>

namespace Ui {
class canvas;
}

class canvas : public QWidget
{
    Q_OBJECT

public:
    explicit canvas(QWidget *parent = nullptr);
    ~canvas();
    void setNum(int num);

private slots:
    void on_pushButton_clicked();

    void on_pushButton_pressed();

//    void prepareUi();

private:
    Ui::canvas *ui;
    QToolBar *m_toolBar;
};

#endif // CANVAS_H
