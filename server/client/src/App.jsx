import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [jobs, setJobs] = useState([])
  const [form, setForm] = useState({ company: '', position: '', link: '' }) // Added link

  // backend url
  const API_URL = 'http://localhost:5001/jobs'
  
  const statusOptions = ['Planning', 'Applied', 'Interview', 'Offer', 'Rejected']

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = () => {
    axios.get(API_URL).then(res => setJobs(res.data))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.company || !form.position) return
    
    console.log("SENDING TO SERVER:", form)

    axios.post(API_URL, form).then(res => {
      console.log("RECEIVED FROM SERVER:", res.data)
      setJobs([...jobs, res.data])
      setForm({ company: '', position: '', link: '' }) 
    })
  }

  const updateStatus = (id, currentStatus) => {
    const currentIndex = statusOptions.indexOf(currentStatus)
    const nextStatus = statusOptions[(currentIndex + 1) % statusOptions.length]
    axios.put(`${API_URL}/${id}`, { status: nextStatus }).then(res => {
      setJobs(jobs.map(job => (job._id === id ? res.data : job)))
    })
  }

  const deleteJob = (id) => {
    axios.delete(`${API_URL}/${id}`).then(() => {
      setJobs(jobs.filter(job => job._id !== id))
    })
  }

  // format dates
  const formatDate = (dateString) => {
    if (!dateString) return ''
    return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  const getBadgeColor = (status) => {
    switch(status) {
      case 'Planning': return '#f3f4f6'; // Grey
      case 'Interview': return '#fef3c7'; // Yellow
      case 'Offer': return '#d1fae5'; // Green
      case 'Rejected': return '#fee2e2'; // Red
      default: return '#e0e7ff'; // Blue (Applied)
    }
  }

  const getTextColor = (status) => {
    switch(status) {
      case 'Planning': return '#374151';
      case 'Interview': return '#d97706'; 
      case 'Offer': return '#059669'; 
      case 'Rejected': return '#dc2626'; 
      default: return '#4338ca'; 
    }
  }

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ color: '#333', textAlign: 'center' }}>JobHunter CRM🥀</h1>
      
    
      <form onSubmit={handleSubmit} style={{ 
        display: 'flex', gap: '10px', marginBottom: '40px', padding: '20px', 
        backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        flexWrap: 'wrap'
      }}>
        <input 
          placeholder="Company" 
          value={form.company} 
          onChange={e => setForm({...form, company: e.target.value})}
          style={{ padding: '10px', flex: '1 1 200px', border: '1px solid #ddd', borderRadius: '5px' }}
        />
        <input 
          placeholder="Position" 
          value={form.position} 
          onChange={e => setForm({...form, position: e.target.value})}
          style={{ padding: '10px', flex: '1 1 200px', border: '1px solid #ddd', borderRadius: '5px' }}
        />
       
        <input 
          placeholder="Job Link (http://...)" 
          value={form.link} 
          onChange={e => setForm({...form, link: e.target.value})}
          style={{ padding: '10px', flex: '1 1 200px', border: '1px solid #ddd', borderRadius: '5px' }}
        />
        <button type="submit" style={{ 
          padding: '10px 20px', backgroundColor: '#4f46e5', color: 'white', 
          border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', flex: '0 0 100px'
        }}>Add</button>
      </form>

    
      <div style={{ display: 'grid', gap: '15px' }}>
        {jobs.map(job => (
          <div key={job._id} style={{ 
            backgroundColor: 'white', padding: '20px', borderRadius: '8px', 
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' 
          }}>
            <div style={{ maxWidth: '60%' }}>
              
              {job.link ? (
                <a href={job.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: '#111' }}>
                  <h3 style={{ margin: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    {job.company} 🔗
                  </h3>
                </a>
              ) : (
                <h3 style={{ margin: 0, color: '#111' }}>{job.company}</h3>
              )}
              
              <p style={{ margin: '5px 0 0', color: '#666' }}>{job.position}</p>
              
              <p style={{ margin: '5px 0 0', fontSize: '0.75rem', color: '#9ca3af' }}>
                Updated: {formatDate(job.lastUpdated)}
              </p>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button 
                onClick={() => updateStatus(job._id, job.status)}
                style={{ 
                  backgroundColor: getBadgeColor(job.status), 
                  color: getTextColor(job.status), 
                  padding: '6px 12px', borderRadius: '20px', border: 'none',
                  fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer',
                  minWidth: '90px'
                }}
              >
                {job.status}
              </button>
              <button 
                onClick={() => deleteJob(job._id)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App