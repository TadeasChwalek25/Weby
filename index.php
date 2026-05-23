<!DOCTYPE html>
<html lang="cs">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="styly.css">
    <title>Kontaktní formulář</title>
</head>
<body>
    <form action="mailer.php" method="post" class="box">
        
        <?php
        
        if($_GET['success'] == 1) {
            echo "<div class=\"form-result success\">Odeslání proběhlo v pořátku</div>";
        }

        if($_GET['success'] == -1) {
            echo "<div class=\"form-result error\">Chyba při odeslání. Zkuste to znovu</div>";
        }

        ?>

        <h1>Kontakt</h1>
        <input type="text" name="name" placeholder="Jméno a příjmení">
        <input type="email" name="email" placeholder="E-mail">
        <textarea name="message" cols="30" rows="10" id=""></textarea>
        <input type="submit" value="Odeslat">
    </form>





    
</body>
</html>

