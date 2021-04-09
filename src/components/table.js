import React, {Component} from 'react';
import axios from 'axios';
import { sortData } from '../utils';

class Table extends Component {
    state = {
        tableData: []
    }
    countryCases = async () => {
        await axios
          .get('https://disease.sh/v3/covid-19/countries')
          .then((res) =>
            this.setState({
                tableData: sortData(res.data)
            })
          )
          .catch((error) => console.log('ERROR', error));
    };

    componentDidMount() {
        this.countryCases();
    }
    render(){
        return (
          <div className='table__container'>
            { this.state.tableData.map(({country, cases, id}) =>(
                <tr>
                    <td className='table__country' key={id}>{country}</td>
                    <td>
                        <strong className='table__cases' key={id}>{cases}</strong>
                    </td>
                </tr>
            ))}
          </div>
        )
    }
}
export default Table;