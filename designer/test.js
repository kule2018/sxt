

//


 //javascript 定义接口有三种方式
   //3 鸭式辨型法实现接口。  --既保留的面向对象 也保留的 解耦 性
   // 实现接口 的第三种方式
   //注释描述法
   // 属性检测法   -缺点: 1，没有完全脱离文档的方式，  2，检测类的实例是否实现接口，  不能检测实现接口的方法.  3, 没有面向对象的思想.
   
   //鸭式辩型法 实现的核心  
   //一个类实现接口的主要目的：把接口里的方法都实现了  (检测方法);  不再检测是否 这个实例对象 是否继承接口., 而是把核心方法放入到接口里的方法.
   //完全面向对象，代码也实现统一，也 解耦了.
   
   
   //1 接口类.  interface   -- Class interface ==> 目的实例化n多个各种各样的接口.  
   //定义一个类， 类作为一个接口的一个基类.  通过类去实例化 n多个接口实例.
   /*
    *	接口类需要两个参数么?
    * 参数1，接口的名字，
    * 参数2，接收方法名称的集合(数组)
    *
    *  写一个接口的 目的 无非是写一些 抽象方法.
    * */
   var Interface=function( name,methods ){  //methods 的名字必须是String类型的可以.
    if( arguments.length != 2 ){
     throw new Error('the instance Interface constructor arguments must be 2 length!');
    };
    this.name=name;
    this.methods=[];  //定义一个内置的空数组对象，等待接受methods里的元素 (方法名字);
    for( var i=0; i<methods.length; ++i ){
     if( typeof methods[i] !== 'string' ){
      throw new Error('ths Interface method name is error');
     };
     this.methods.push( methods[i] );
    };
   };
   
   //2 准备工作:  具体的实现类
   //①实例化接口对象.
   var CompositeInterface=new Interface('CompositeInteface',['add','remove']);
   var FormIntemInterface=new Interface('FormIntemInterface',['update','select']);
   //CompositeImpl implements  CompositeInterface,FormIntemInterface.
   //②具体的实现类
   var CompositeImpl=function(){  }
   //③实现接口的方法
   //implements methods
   CompositeImpl.prototype.add=function(){ alert('add');  }
   CompositeImpl.prototype.remove=function(){ alert('remove'); }
   CompositeImpl.prototype.update=function(){}
   CompositeImpl.prototype.select=function(){}
   //3: 检验接口里的方法.
   //检验通过， 不做任何操作， 代码继续执行.   不通过，抛出异常， Error.    //这个方法的目的，就是检测方法的 .
   Interface.ensureImplements=function( obj ){  //核心检验方法.
    if( arguments.length < 2 ){ //如果检测的方法接受的参数小于2个， 参数传递失败.
     throw new Error('Interface.ensureImplements method constructor arguments must be >= 2!');
    };
    //获得接口实例对象，通过接口实例对象， 得到接口实例对象里的方法.
    for( var i=1; i<arguments.length; ++i ){
     var instanceInterface=arguments[i];
     //判断参数 是否是接口类的  类型. 是否是 接口类的构造函数.
     if( instanceInterface.constructor != Interface ){  
      throw new Error('the arguments constructor not be Interface Class');
     };
     //循环接口实例对象的每一个方法 .
     for( var j=0; j<instanceInterface.methods.length; ++j ){
      //用一个临时变量接收每一个方法的名字，注意是字符，并不是函数.
      var methodName=instanceInterface.methods[j];
      //object[key];
      if( !obj[methodName] || typeof obj[methodName] !== 'function' ){
       //对象没有这个方法.
       throw new Error('the method name ' + methodName + ' is not found!');
      };
     };
    }
   }
   
   var c1=new CompositeImpl();
   Interface.ensureImplements( c1,CompositeInterface,FormIntemInterface );
   c1.add();







