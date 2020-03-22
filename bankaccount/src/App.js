import React from 'react';
import { Table, Input, Button } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

class App extends React.Component {
  state = {
    searchText: '',
    searchedColumn: '',
    dataa: []
  };

  async componentDidMount(){
    fetch('http://starlord.hackerearth.com/bankAccount', {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem('access_token')}`
      }
    })
      .then(res => res.json())
      .then(json => {
        console.log(json)
        this.setState({dataa: json});
      })
  }

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  render() {
    const columnss= [
      {
        title: 'Account Number',
        dataIndex: 'Account No',
        key: 'Account No',
        width: '10%',
        ...this.getColumnSearchProps('Account No'),
      },
      {
        title: 'Date',
        dataIndex: 'Date',
        key: 'Date',
        width: '10%',
        ...this.getColumnSearchProps('Date'),
      },
      {
        title: 'Transaction Details ',
        dataIndex: 'Transaction Details',
        key: 'Transaction Details',
        width: '25%',
        ...this.getColumnSearchProps('Transaction Details'),
      },
      {
        title: 'Value Date',
        dataIndex: 'Value Date',
        key: 'Value Date',
        width: '15%',
        ...this.getColumnSearchProps('Value Date'),
      },
      {
        title: '',
        dataIndex: 'Withdrawal AMT',
        key: 'Withdrawal AMT',
        width: '15%',
        ...this.getColumnSearchProps('Withdrawal AMT'),
      },
      {
        title: '',
        dataIndex: 'Deposit AMT',
        key: 'Deposit AMT',
        width: '15%',
        ...this.getColumnSearchProps('Deposit AMT'),
      },
      {
        title: 'Balance AMT',
        dataIndex: 'Balance AMT',
        key: 'Balance AMT',
        width: '15%',
        ...this.getColumnSearchProps('Balance AMT'),
      },
    ];
    return <Table columns={columnss} dataSource={this.state.dataa} />;
  }
}
 
export default App;