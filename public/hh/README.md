# city_selector

## 中国省市区选择器

### 引入JS

```
<script type="text/javascript" src="jquery.min.js"></script>
<script type="text/javascript" src="data.js"></script>
<script type="text/javascript" src="selector.js"></script>
```

### 配置JS

```
<script type='text/javascript'>
    //自定义配置
    var config = {
        province: '#province',
        city: '#city',
        area: '#area'
    };
    //初始化
    $(function () {
        selector(config);
    });
</script>
```

### 使用HTML

```
省：<select id="province"></select>
市：<select id="city"></select>
区：<select id="area"></select>
```