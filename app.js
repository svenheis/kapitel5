import express from 'express';

const app = express();
const port = 3000;

app.get('/hello', (req,res) => {
  res.json('Hello')
});

app.use(middlewareFunction)
app.use('/public', express.static('public'))


const result = await response.json();
  this.setState({issues: result.data.issueList})

app.listen(port, () =>{
  console.log(`server start on port ${port}`)
})



/*

function IssueRow(props) {
  const issue = props.issue;
  return (
  <tr>
    <td>{issue.effort}</td>
  </tr>  
  )
};

 loadData() {
  const query = `query {
  issueList {
    id title status owner
    created effort due
  }
}`;
  const response = await fetch('/graphql', {
    method: 'POST',
    headers:{ 'Content-Type': 'application/json'},
    body: JSON.stringify({query})
    }); 
};

*/