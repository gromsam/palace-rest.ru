<?php

$recepient = "gromsam@mail.ru";


$name = trim($_POST["name"]);
$phone = trim($_POST["email"]);
$text = trim($_POST["text"]);
$sitename = trim($_POST["namesite"]);

if($name == ''){$name = false;}
if($phone == ''){$phone = false;}
if($text == ''){$text = false;}

if($name && $phone && $text && $sitename){
    $pagetitle = "Новая заявка с сайта \"$sitename\"";
    $message = "Имя: $name \nТелефон: $phone \nТекст: $text";
    $mail = mail($recepient, $pagetitle, $message, "Content-type: text/plain; charset=\"utf-8\"\n From: $recepient");
    
    if($mail){
        echo "Ваше обращение отправленно";
    }else{
        echo"Ваше обращение не отправленно, обратитесь пожалуйста к администратору сайта";
    }
    
}else{
    echo"Поля в форме должны быть заполненны";
}
