$(document).ready(function(){

     
     $('input#name,input#phone, input#email, textarea#message').unbind().blur( function(){

      
         var id = $(this).attr('id');
         var val = $(this).val();

      
       switch(id)
       {
             // Проверка поля "Имя"
             case 'name':
                var rv_name = /^[a-zA-Zа-яА-Я]+$/; 

               

                if(val.length > 2 && val != '' && rv_name.test(val))
                {
                   $(this).addClass('not_error');
                   $(this).next('.error-box').text('Принято')
                                             .css('color','green')
                                             .animate({'paddingLeft':'10px'},400)
                                             .animate({'paddingLeft':'5px'},400);
                }

            

                else
                {
                   $(this).removeClass('not_error').addClass('error');
                   $(this).next('.error-box').html('поле "Имя" обязательно для заполнения<br>, длина имени должна составлять не менее 2 символов<br>, поле должно содержать только русские или латинские буквы')
                                              .css('color','red')
                                              .animate({'paddingLeft':'10px'},400)
                                              .animate({'paddingLeft':'5px'},400);
                }
            break;
			//Проверка поля "Телефон"
			 case 'phone':
                var rv_phone = /[0-9]{11}/; 

               

                if(val.length == 11 && val != '' && rv_phone.test(val))
                {
                   $(this).addClass('not_error');
                   $(this).next('.error-box').text('Принято')
                                             .css('color','green')
                                             .animate({'paddingLeft':'10px'},400)
                                             .animate({'paddingLeft':'5px'},400);
                }

            

                else
                {
                   $(this).removeClass('not_error').addClass('error');
                   $(this).next('.error-box').html('поле "Телефон" обязательно для заполнения<br>, длина  должна составлять 11 символов и содержать только цифры')
                                              .css('color','red')
                                              .animate({'paddingLeft':'10px'},400)
                                              .animate({'paddingLeft':'5px'},400);
                }
            break;

           // Проверка email
           case 'email':
               var rv_email = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;
               if(val != '' && rv_email.test(val))
               {
                  $(this).addClass('not_error');
                  $(this).next('.error-box').text('Принято')
                                            .css('color','green')
                                            .animate({'paddingLeft':'10px'},400)
                                            .animate({'paddingLeft':'5px'},400);
               }
               else
               {
                  $(this).removeClass('not_error').addClass('error');
                  $(this).next('.error-box').html('поле "Email" обязательно для заполнения<br>, поле должно содержать правильный email-адрес<br>')
                                             .css('color','red')
                                             .animate({'paddingLeft':'10px'},400)
                                             .animate({'paddingLeft':'5px'},400);
               }
           break;


          // Проверка поля "Сообщение"
          case 'message':
              if(val != '' && val.length < 5000)
              {
                 $(this).addClass('not_error');
                 $(this).next('.error-box').text('Принято')
                                           .css('color','green')
                                           .animate({'paddingLeft':'10px'},400)
                                           .animate({'paddingLeft':'5px'},400);
              }
              else
              {
                 $(this).removeClass('not_error').addClass('error');
                 $(this).next('.error-box').html('поле "Текст сообщения" обязательно для заполнения')
                                           .css('color','red')
                                           .animate({'paddingLeft':'10px'},400)
                                           .animate({'paddingLeft':'5px'},400);
              }
          break;

       } 

     }); 

     
     $('form#feedback-form').submit(function(e){

         
         e.preventDefault();

         

         if($('.not_error').length == 4)
         {
          

             $.ajax({
                    url: 'send.php',
                    type: 'post',
                    data: $(this).serialize(),

                    beforeSend: function(xhr, textStatus){ 
                         $('form#feedback-form :input').attr('disabled','disabled');
                    },

                   success: function(response){
                        $('form#feedback-form :input').removeAttr('disabled');
                        $('form#feedback-form :text, textarea').val('').removeClass().next('.error-box').text('');
                        alert(response);
                   }
            }); 
        }

        
       else
       {
         alert('Форма заполнена некорректно');
       }

   }); 

  }); 