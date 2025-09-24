import axios from 'axios';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Icon, Table } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';

export default function ListCliente () {

   const [lista, setLista] = useState([]);

   useEffect(() => {
       carregarLista();
   }, [])

   function carregarLista() {

       axios.get("http://localhost:8080/api/produto")
       .then((response) => {
           setLista(response.data)
       })
   }

   function formatarData(dataParam) {

       if (dataParam === null || dataParam === '' || dataParam === undefined) {
           return ''
       }

       let arrayData = dataParam.split('-');
       return arrayData[2] + '/' + arrayData[1] + '/' + arrayData[0];
   }

   return(
       <div>
           <MenuSistema tela={'cliente'} />
           <div style={{marginTop: '3%'}}>

               <Container textAlign='justified' >

                   <h2> Cliente </h2>
                   <Divider />

                   <div style={{marginTop: '4%'}}>
                       <Button
                           label='Novo'
                           circular
                           color='orange'
                           icon='clipboard outline'
                           floated='right'
                           as={Link}
                           to='/form-cliente'
                       />
 <br/><br/><br/>
                  
                       <Table color='orange' sortable celled>

                           <Table.Header>
                               <Table.Row>
                                   <Table.HeaderCell>Tituo</Table.HeaderCell>
                                   <Table.HeaderCell>CodigodeProduto</Table.HeaderCell>
                                   <Table.HeaderCell>Descrição</Table.HeaderCell>
                                   <Table.HeaderCell>ValorUnitario</Table.HeaderCell>
                                   <Table.HeaderCell>TempoEntregaMax</Table.HeaderCell>
                                   <Table.HeaderCell>tempoEntregaMin</Table.HeaderCell>
                                   <Table.HeaderCell textAlign='center'>Ações</Table.HeaderCell>
                               </Table.Row>
                           </Table.Header>
                      
                           <Table.Body>

                               { lista.map(produto => (

                                   <Table.Row key={produto.id}>
                                       <Table.Cell>{produto.titulo}</Table.Cell>
                                       <Table.Cell>{produto.codigoProduto}</Table.Cell>
                                       <Table.Cell>{produto.descricao}</Table.Cell>
                                       <Table.Cell>{produto.valorUnitario}</Table.Cell>
                                        <Table.Cell>{produto.tempoEntregaMin}</Table.Cell>
                                        <Table.Cell>{produto.tempoEntregaMax}</Table.Cell>
                                       <Table.Cell textAlign='center'>

                                           <Button
                                               inverted
                                               circular
                                               color='green'
                                               title='Clique aqui para editar os dados deste entregador'
                                               icon>
                                                    <Icon name='edit' />
                                           </Button> &nbsp;
   <Button
                                               inverted
                                               circular
                                               color='red'
                                               title='Clique aqui para remover este entregador'
                                               icon>
                                                   <Icon name='trash' />
                                           </Button>

                                       </Table.Cell>
                                   </Table.Row>
                               ))}

                           </Table.Body>
                       </Table>
                   </div>
               </Container>
           </div>

       </div>
   )
}


  