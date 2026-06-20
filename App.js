import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [assignments, setAssignments] = useState([]);
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/assignments');
      setAssignments(res.data);
    } catch (err) {
      console.log("Backend connection error!", err);
    }
  };

  const handleAddAssignment = async (e) => {
    e.preventDefault();
    if (!title || !subject || !dueDate) return alert("Please fill all fields!");
    
    const newAsm = { id: Date.now(), title, subject, dueDate, status: 'Pending' };
    setAssignments([...assignments, newAsm]);
    
    setTitle(''); setSubject(''); setDueDate('');
  };

  const counts = {
    Total: assignments.length,
    Submitted: assignments.filter(a => a.status === 'Submitted').length,
    Pending: assignments.filter(a => a.status === 'Pending').length,
  };


  const filteredList = assignments.filter(asm => {
    if (!searchTerm.trim()) return true;
    return asm.subject && asm.subject.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f7f6', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>🎓 College Assignment Submission Tracker</h1>

      {/* DASHBOARD SUMMARY COUNTS */}
      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginBottom: '30px' }}>
        <div style={{ background: '#333', color: '#fff', padding: '20px', borderRadius: '10px', minWidth: '120px', textAlign: 'center' }}>
          <h3>Total</h3><p style={{ fontSize: '24px', fontWeight: 'bold' }}>{counts.Total}</p>
        </div>
        <div style={{ background: '#28a745', color: '#fff', padding: '20px', borderRadius: '10px', minWidth: '120px', textAlign: 'center' }}>
          <h3>Submitted</h3><p style={{ fontSize: '24px', fontWeight: 'bold' }}>{counts.Submitted}</p>
        </div>
        <div style={{ background: '#ffc107', color: '#333', padding: '20px', borderRadius: '10px', minWidth: '120px', textAlign: 'center' }}>
          <h3>Pending</h3><p style={{ fontSize: '24px', fontWeight: 'bold' }}>{counts.Pending}</p>
        </div>
      </div>

      {/* ADD ASSIGNMENT FORM */}
      <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', maxWidth: '500px', margin: '0 auto 30px auto', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
        <h3 style={{ marginTop: 0 }}>Add New Assignment</h3>
        <form onSubmit={handleAddAssignment} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input type="text" placeholder="Assignment Title" value={title} onChange={e => setTitle(e.target.value)} style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
          <input type="text" placeholder="Subject (e.g. Java, Web Tech)" value={subject} onChange={e => setSubject(e.target.value)} style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
          <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
          <button type="submit" style={{ padding: '10px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Add Assignment</button>
        </form>
      </div>

      {/* 🔍 FILTER BY SUBJECT */}
      <div style={{ maxWidth: '800px', margin: '0 auto 15px auto', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <label style={{ fontWeight: 'bold' }}>Filter by Subject: </label>
        <input 
          type="text" 
          placeholder="Type subject name to search..." 
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', width: '250px' }} 
        />
      </div>

      
      <div style={{ maxWidth: '800px', margin: '0 auto', background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#eee', borderBottom: '2px solid #ccc' }}>
              <th style={{ padding: '12px' }}>Title</th>
              <th style={{ padding: '12px' }}>Subject</th>
              <th style={{ padding: '12px' }}>Due Date</th>
              <th style={{ padding: '12px' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredList.map(asm => (
              <tr key={asm.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '12px' }}>{asm.title}</td>
                <td style={{ padding: '12px' }}>{asm.subject}</td>
                <td style={{ padding: '12px' }}>{asm.dueDate}</td>
                <td style={{ padding: '12px' }}>
                  <select 
                    value={asm.status} 
                    onChange={e => {
                      const updated = assignments.map(a => a.id === asm.id ? { ...a, status: e.target.value } : a);
                      setAssignments(updated);
                    }}
                    style={{ padding: '5px', borderRadius: '4px', fontWeight: 'bold', backgroundColor: asm.status === 'Submitted' ? '#d4edda' : '#fff3cd' }}
                  >
                    <option value="Pending">❌ Pending</option>
                    <option value="Submitted">✅ Submitted</option>
                  </select>
                </td>
              </tr>
            ))}
            {filteredList.length === 0 && (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', padding: '20px', color: '#999' }}>No assignments found!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;