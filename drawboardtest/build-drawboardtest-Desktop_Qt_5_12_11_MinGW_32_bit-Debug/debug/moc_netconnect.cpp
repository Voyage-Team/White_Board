/****************************************************************************
** Meta object code from reading C++ file 'netconnect.h'
**
** Created by: The Qt Meta Object Compiler version 67 (Qt 5.12.11)
**
** WARNING! All changes made in this file will be lost!
*****************************************************************************/

#include "../../drawboardtest/netconnect.h"
#include <QtCore/qbytearray.h>
#include <QtCore/qmetatype.h>
#if !defined(Q_MOC_OUTPUT_REVISION)
#error "The header file 'netconnect.h' doesn't include <QObject>."
#elif Q_MOC_OUTPUT_REVISION != 67
#error "This file was generated using the moc from 5.12.11. It"
#error "cannot be used with the include files from this version of Qt."
#error "(The moc has changed too much.)"
#endif

QT_BEGIN_MOC_NAMESPACE
QT_WARNING_PUSH
QT_WARNING_DISABLE_DEPRECATED
struct qt_meta_stringdata_NetConnect_t {
    QByteArrayData data[18];
    char stringdata0[175];
};
#define QT_MOC_LITERAL(idx, ofs, len) \
    Q_STATIC_BYTE_ARRAY_DATA_HEADER_INITIALIZER_WITH_OFFSET(len, \
    qptrdiff(offsetof(qt_meta_stringdata_NetConnect_t, stringdata0) + ofs \
        - idx * sizeof(QByteArrayData)) \
    )
static const qt_meta_stringdata_NetConnect_t qt_meta_stringdata_NetConnect = {
    {
QT_MOC_LITERAL(0, 0, 10), // "NetConnect"
QT_MOC_LITERAL(1, 11, 6), // "joined"
QT_MOC_LITERAL(2, 18, 0), // ""
QT_MOC_LITERAL(3, 19, 4), // "name"
QT_MOC_LITERAL(4, 24, 2), // "id"
QT_MOC_LITERAL(5, 27, 8), // "userLeft"
QT_MOC_LITERAL(6, 36, 11), // "figureAdded"
QT_MOC_LITERAL(7, 48, 6), // "figure"
QT_MOC_LITERAL(8, 55, 13), // "figureDeleted"
QT_MOC_LITERAL(9, 69, 13), // "figureCleared"
QT_MOC_LITERAL(10, 83, 7), // "ownerId"
QT_MOC_LITERAL(11, 91, 12), // "errorOccured"
QT_MOC_LITERAL(12, 104, 4), // "desc"
QT_MOC_LITERAL(13, 109, 11), // "onConnected"
QT_MOC_LITERAL(14, 121, 11), // "onReadyRead"
QT_MOC_LITERAL(15, 133, 7), // "onError"
QT_MOC_LITERAL(16, 141, 28), // "QAbstractSocket::SocketError"
QT_MOC_LITERAL(17, 170, 4) // "sock"

    },
    "NetConnect\0joined\0\0name\0id\0userLeft\0"
    "figureAdded\0figure\0figureDeleted\0"
    "figureCleared\0ownerId\0errorOccured\0"
    "desc\0onConnected\0onReadyRead\0onError\0"
    "QAbstractSocket::SocketError\0sock"
};
#undef QT_MOC_LITERAL

static const uint qt_meta_data_NetConnect[] = {

 // content:
       8,       // revision
       0,       // classname
       0,    0, // classinfo
       9,   14, // methods
       0,    0, // properties
       0,    0, // enums/sets
       0,    0, // constructors
       0,       // flags
       6,       // signalCount

 // signals: name, argc, parameters, tag, flags
       1,    2,   59,    2, 0x06 /* Public */,
       5,    2,   64,    2, 0x06 /* Public */,
       6,    1,   69,    2, 0x06 /* Public */,
       8,    1,   72,    2, 0x06 /* Public */,
       9,    1,   75,    2, 0x06 /* Public */,
      11,    1,   78,    2, 0x06 /* Public */,

 // slots: name, argc, parameters, tag, flags
      13,    0,   81,    2, 0x09 /* Protected */,
      14,    0,   82,    2, 0x09 /* Protected */,
      15,    1,   83,    2, 0x09 /* Protected */,

 // signals: parameters
    QMetaType::Void, QMetaType::QString, QMetaType::Int,    3,    4,
    QMetaType::Void, QMetaType::QString, QMetaType::Int,    3,    4,
    QMetaType::Void, QMetaType::QJsonObject,    7,
    QMetaType::Void, QMetaType::Int,    4,
    QMetaType::Void, QMetaType::Int,   10,
    QMetaType::Void, QMetaType::QString,   12,

 // slots: parameters
    QMetaType::Void,
    QMetaType::Void,
    QMetaType::Void, 0x80000000 | 16,   17,

       0        // eod
};

void NetConnect::qt_static_metacall(QObject *_o, QMetaObject::Call _c, int _id, void **_a)
{
    if (_c == QMetaObject::InvokeMetaMethod) {
        auto *_t = static_cast<NetConnect *>(_o);
        Q_UNUSED(_t)
        switch (_id) {
        case 0: _t->joined((*reinterpret_cast< QString(*)>(_a[1])),(*reinterpret_cast< int(*)>(_a[2]))); break;
        case 1: _t->userLeft((*reinterpret_cast< QString(*)>(_a[1])),(*reinterpret_cast< int(*)>(_a[2]))); break;
        case 2: _t->figureAdded((*reinterpret_cast< const QJsonObject(*)>(_a[1]))); break;
        case 3: _t->figureDeleted((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 4: _t->figureCleared((*reinterpret_cast< int(*)>(_a[1]))); break;
        case 5: _t->errorOccured((*reinterpret_cast< const QString(*)>(_a[1]))); break;
        case 6: _t->onConnected(); break;
        case 7: _t->onReadyRead(); break;
        case 8: _t->onError((*reinterpret_cast< QAbstractSocket::SocketError(*)>(_a[1]))); break;
        default: ;
        }
    } else if (_c == QMetaObject::RegisterMethodArgumentMetaType) {
        switch (_id) {
        default: *reinterpret_cast<int*>(_a[0]) = -1; break;
        case 8:
            switch (*reinterpret_cast<int*>(_a[1])) {
            default: *reinterpret_cast<int*>(_a[0]) = -1; break;
            case 0:
                *reinterpret_cast<int*>(_a[0]) = qRegisterMetaType< QAbstractSocket::SocketError >(); break;
            }
            break;
        }
    } else if (_c == QMetaObject::IndexOfMethod) {
        int *result = reinterpret_cast<int *>(_a[0]);
        {
            using _t = void (NetConnect::*)(QString , int );
            if (*reinterpret_cast<_t *>(_a[1]) == static_cast<_t>(&NetConnect::joined)) {
                *result = 0;
                return;
            }
        }
        {
            using _t = void (NetConnect::*)(QString , int );
            if (*reinterpret_cast<_t *>(_a[1]) == static_cast<_t>(&NetConnect::userLeft)) {
                *result = 1;
                return;
            }
        }
        {
            using _t = void (NetConnect::*)(const QJsonObject & );
            if (*reinterpret_cast<_t *>(_a[1]) == static_cast<_t>(&NetConnect::figureAdded)) {
                *result = 2;
                return;
            }
        }
        {
            using _t = void (NetConnect::*)(int );
            if (*reinterpret_cast<_t *>(_a[1]) == static_cast<_t>(&NetConnect::figureDeleted)) {
                *result = 3;
                return;
            }
        }
        {
            using _t = void (NetConnect::*)(int );
            if (*reinterpret_cast<_t *>(_a[1]) == static_cast<_t>(&NetConnect::figureCleared)) {
                *result = 4;
                return;
            }
        }
        {
            using _t = void (NetConnect::*)(const QString & );
            if (*reinterpret_cast<_t *>(_a[1]) == static_cast<_t>(&NetConnect::errorOccured)) {
                *result = 5;
                return;
            }
        }
    }
}

QT_INIT_METAOBJECT const QMetaObject NetConnect::staticMetaObject = { {
    &QTcpSocket::staticMetaObject,
    qt_meta_stringdata_NetConnect.data,
    qt_meta_data_NetConnect,
    qt_static_metacall,
    nullptr,
    nullptr
} };


const QMetaObject *NetConnect::metaObject() const
{
    return QObject::d_ptr->metaObject ? QObject::d_ptr->dynamicMetaObject() : &staticMetaObject;
}

void *NetConnect::qt_metacast(const char *_clname)
{
    if (!_clname) return nullptr;
    if (!strcmp(_clname, qt_meta_stringdata_NetConnect.stringdata0))
        return static_cast<void*>(this);
    return QTcpSocket::qt_metacast(_clname);
}

int NetConnect::qt_metacall(QMetaObject::Call _c, int _id, void **_a)
{
    _id = QTcpSocket::qt_metacall(_c, _id, _a);
    if (_id < 0)
        return _id;
    if (_c == QMetaObject::InvokeMetaMethod) {
        if (_id < 9)
            qt_static_metacall(this, _c, _id, _a);
        _id -= 9;
    } else if (_c == QMetaObject::RegisterMethodArgumentMetaType) {
        if (_id < 9)
            qt_static_metacall(this, _c, _id, _a);
        _id -= 9;
    }
    return _id;
}

// SIGNAL 0
void NetConnect::joined(QString _t1, int _t2)
{
    void *_a[] = { nullptr, const_cast<void*>(reinterpret_cast<const void*>(&_t1)), const_cast<void*>(reinterpret_cast<const void*>(&_t2)) };
    QMetaObject::activate(this, &staticMetaObject, 0, _a);
}

// SIGNAL 1
void NetConnect::userLeft(QString _t1, int _t2)
{
    void *_a[] = { nullptr, const_cast<void*>(reinterpret_cast<const void*>(&_t1)), const_cast<void*>(reinterpret_cast<const void*>(&_t2)) };
    QMetaObject::activate(this, &staticMetaObject, 1, _a);
}

// SIGNAL 2
void NetConnect::figureAdded(const QJsonObject & _t1)
{
    void *_a[] = { nullptr, const_cast<void*>(reinterpret_cast<const void*>(&_t1)) };
    QMetaObject::activate(this, &staticMetaObject, 2, _a);
}

// SIGNAL 3
void NetConnect::figureDeleted(int _t1)
{
    void *_a[] = { nullptr, const_cast<void*>(reinterpret_cast<const void*>(&_t1)) };
    QMetaObject::activate(this, &staticMetaObject, 3, _a);
}

// SIGNAL 4
void NetConnect::figureCleared(int _t1)
{
    void *_a[] = { nullptr, const_cast<void*>(reinterpret_cast<const void*>(&_t1)) };
    QMetaObject::activate(this, &staticMetaObject, 4, _a);
}

// SIGNAL 5
void NetConnect::errorOccured(const QString & _t1)
{
    void *_a[] = { nullptr, const_cast<void*>(reinterpret_cast<const void*>(&_t1)) };
    QMetaObject::activate(this, &staticMetaObject, 5, _a);
}
QT_WARNING_POP
QT_END_MOC_NAMESPACE
