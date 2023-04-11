import React, { useState } from "react";
import { Button, Container, Form, Table } from "react-bootstrap";
import { det } from 'mathjs'


const CramerRule = () => {
    const [Matrix, setMatrix] = useState([]);
    const [N, setN] = useState(0);
    const [Ans, setAns] = useState([]);
    
    const [html, setHtml] = useState(null);
    const createTable = () =>{ 
        return(
        <div>
            <label>INPUT Matrix</label>
        </div>
    )}

    const inputnum = (event) => {
       setN(parseInt(event.target.value));
       setMatrix(new Array(parseInt(event.target.value)).fill(new Array(parseInt(event.target.value)).fill(0)));
       setHtml(createTable(event.target.value)); 
    }
    const calCramer = (A,A1,A2,A3,B) =>{
        var X = [];
        if(N == 2){
            for(let i = 0; i < N; i++){
                X.push([0])
                for(let j = 0; j < 1; j++){
                    A1[i][j] = B[i];
                }
            }
            for(let i = 0; i < N; i++){
                for(let j = 1; j < 2; j++){
                    A2[i][j] = B[i];
                }
            }
            X[0] = det(A1)/det(A);
            X[1] = det(A2)/det(A);
        }
        else if(N == 3){
            for(let i = 0; i < N; i++){
                X.push([0])
                for(let j = 0; j < 1; j++){
                    A1[i][j] = B[i];
                }
            }
            for(let i = 0; i < N; i++){
                for(let j = 1; j < 2; j++){
                    A2[i][j] = B[i];
                }
            }
            for(let i = 0; i < N; i++){
                for(let j = 2; j < 3; j++){
                    A3[i][j] = B[i];
                }
            }
            X[0] = det(A1)/det(A);
            X[1] = det(A2)/det(A);
            X[2] = det(A3)/det(A);
        }
        console.log(A1);
        console.log(A2);
        console.log(A3);
        return X;
    }
    const calculateRoot = () =>{
        var A = [];
        var A1 = [];
        var A2 = [];
        var A3 = [];
        var B = [];
        for(let i = 0; i < N; i++){
            A.push([0])
            B.push([0])
            A1.push([0])
            A2.push([0])
            A3.push([0])
            for(let j = 0; j < N; j++){
                A[i][j] = 0;
            }
        }
        for(var i = 0; i < N; i++){
            B[i] = parseFloat(document.getElementById("B"+i+i).value);;
            for(var j = 0; j < N; j++){
                A[i][j] = parseFloat(document.getElementById("A"+i+j).value);
                A1[i][j] = A2[i][j] = A3[i][j] = A[i][j];
            }
        }
        console.log(A);
        console.log(B);
        setAns(calCramer(A,A1,A2,A3,B));
    }
   
    return (
        <Container>
            <Form>
                <h1>Cramer's Rule</h1>
                <label><b>Size of Matrix :</b></label><label>N X N</label>
                <input type="number" id="N"  onChange={inputnum}  max="3" />
                <Container className="inputmatrix">
                    {html} 
                    <Table>
                        {Matrix.map((element,index) => {
                            var i = index;
                            return(
                                <tr key= {i} >
                                {Matrix[i].map((element,index) => {
                                    return(
                                        <td key={"A" + i + index}>
                                            <center>
                                            <input id={"A" + i + index} placeholder={"A" + i + index} style={{width:"80%"}}/>
                                            </center>
                                        </td>
                                    )
                                })}
                                <td key={"B" + i + index}>
                                    <center>
                                        <input id={"B" + i + index} placeholder={"B" + i + index} style={{width:"80%"}}/>
                                    </center>
                                </td>
                                </tr>
                            )
                        })}
                    </Table>
                </Container>
                <Button variant="dark" onClick={calculateRoot}>
                    Calculate
                </Button>
            </Form>
            <div className="showresult">
                {Ans.map((element,index)=>{
                    return(
                        <label> X{index+1} = {element.toFixed(6)} </label>
                    )
                })}
            </div>
        </Container>
    );
};
export default CramerRule