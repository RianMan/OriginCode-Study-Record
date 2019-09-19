## fs 常用的API

1. fs.unlink(path, callback) 删除一个文件

2. fs.access()

3. fs.stat(path,callback)方法用于查询文件信息 callback 的第二个参数是一个文件对象，
可以通过isFile()判断是文件还是文件夹

4. fs.mkdir(path,callback) 该方法可以用于创建一个目录文件夹

5. fs.rmdir(path,callback) 该方法可以用于删除一个<b>空目录</b>。其中path为该目录的绝对物理路径，callback回调函数当中也只有一个错误信息参数，一般在该目录不存在或者删除操作失败时触发调用。

6. fs.readdir(path,callback) 该方法可以用于读取一个指定目录当中的信息。其中path为该目录的绝对物理路径，callback回调函数当中有两个参数err和files,

7. fs.readFile 读取文件