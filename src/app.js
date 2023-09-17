const express= require('express');
const cors=require('cors');
const app=express();
const nodemailer=require('nodemailer');
app.use(express.json());
app.use(cors());

enviarEmail= async(asunto,texto)=>{
   const config={
    host:'smtp.gmail.com',
    port:587,
    auth:{
        user:'jeanpierks6@gmail.com',
        pass: 'mgsmrhnrcrtlbeqw'
    }
   }
   const mensaje={
    from:'jeanpierks@gmail.con',
    to:'jeanpierks6@gmail.com',
    subject:asunto,
    text:texto
   }

   const transport=nodemailer.createTransport(config);
   const info= await transport.sendMail(mensaje);
   console.log('mensaje eniviado con exito');
}


app.get('/',(req,res)=>{
   res.send("Estas en la ruta raiz del proyecto");
   console.log("respondiendo en el servidor");
})

app.post('/',(req,res)=>{
    const dato=req.body;
    const asunto=dato.asunto;
    const texto=`${dato.nombres}\n${dato.correo}\n${dato.telefono}\n${dato.mensaje}`;
    enviarEmail(asunto,texto);
})


const PORT=process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`El servidor se encuentra corriendo en el puerto: ${PORT} ...`);

});


/*POST http://localhost:3000/ HTTP/1.1
Content-Type: application/json

        {
            "asunto":"Nombre de la empresa",
            "nombres":"Nombre del solicitante",
            "correo":"empresasoli@gmial.com",
            "telefono":"966516707",
            "mensaje":"Solicito informacion para la creacion de una pagina web"
         }*/ 