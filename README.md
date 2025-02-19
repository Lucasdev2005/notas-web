## NOTAS-API

## compilando localmente

1) instale as depêndencias do projeto com o comando ```npm install```
2) crie um arquivo ```.env``` seguindo os valores que estão configurados no arquivo ```.env.sample```.
3) com o docker instalado em sua máquina rode o comando ```docker compose up -d``` para iniciar o container da aplicação com todas as depêndencias necessárias. (mongo e mongo-express)
4) após isso, todas suas alterações refletirão no container, assim basta rodar o comando ```docker logs notas-web -f``` para rastrear os logs da API.
5) entre na documentação da API para estudar os endpoints [swagger](http://localhost:3001/swagger).

## CI/CD
o projeto possui pipeline configurada. Todas as alterações na branch master irão realizar o upload de uma nova imagem do projeto no docker hub. ```lucssdev2005/notas-web:latest```


## tecnologias usadas

<div align="center"> 
 <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" width=100 heigth=100 />
  <div>NextJS</div>
  <div>Foi utilizado o framework Node NextJS para contrução do front end.</div>
</div>

<br/>
<br/>
<br/>

<div align="center"> 
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" width=100 heigth=100 />
  <div>Docker</div>
  <div>Foi utilizado o Docker para containerização da aplicação e construção do ambiente de desenvolvimento de forma mais simples.</div>
</div>
