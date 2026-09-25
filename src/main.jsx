import React, {useMemo, useState} from 'react';
import {createRoot} from 'react-dom/client';
import './styles.css';

const Icon=({name,size=20})=>{const p={home:'M3 11.5 12 4l9 7.5M5.5 10v10h13V10M9 20v-6h6v6',book:'M4 5.5A3.5 3.5 0 0 1 7.5 2H11v18H7.5A3.5 3.5 0 0 0 4 23V5.5Zm16 0A3.5 3.5 0 0 0 16.5 2H13v18h3.5A3.5 3.5 0 0 1 20 23V5.5Z',exam:'M9 11l2 2 4-5M6 3h12v18H6z',chart:'M4 20V10m6 10V4m6 16v-7m5 7H2',search:'m21 21-4.35-4.35m2.35-5.65a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z',bell:'M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4',arrow:'m9 18 6-6-6-6',clock:'M12 6v6l4 2M22 12A10 10 0 1 1 2 12a10 10 0 0 1 20 0',check:'m5 12 4 4L19 6',menu:'M4 7h16M4 12h16M4 17h16'}[name];return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={p}/></svg>}

const courses=[
 {id:1,code:'NSS 201',title:'National Security Studies',faculty:'Faculty of Joint Studies',color:'#0c6786',enrolled:true,examDate:'18 Aug 2026'},
 {id:2,code:'ICT 114',title:'Digital Literacy & Cyber Safety',faculty:'Faculty of ICT',color:'#da8d30',enrolled:true,examDate:'Available now'},
 {id:3,code:'LDR 304',title:'Leadership & Strategic Thinking',faculty:'School of Leadership',color:'#6c4f91',enrolled:false,examDate:'22 Aug 2026'},
 {id:4,code:'COM 108',title:'Professional Communication',faculty:'School of Communication',color:'#36855d',enrolled:false,examDate:'25 Aug 2026'}
];
const exams=[
 {course:'NSS 201',title:'National Security Mid-Semester Test',date:'18 Aug, 2026',time:'10:00 AM',duration:'45 min',questions:30,status:'upcoming'},
 {course:'ICT 114',title:'Cyber Safety Practice Test',date:'Available now',time:'',duration:'20 min',questions:15,status:'ready'}
];

function App(){
 const [view,setView]=useState('dashboard'),[query,setQuery]=useState(''),[enrolled,setEnrolled]=useState([1,2]),[toast,setToast]=useState(''),[examOpen,setExamOpen]=useState(false),[answer,setAnswer]=useState('');
 const visible=useMemo(()=>courses.filter(c=>(c.title+c.code+c.faculty).toLowerCase().includes(query.toLowerCase())),[query]);
 const flash=t=>{setToast(t);setTimeout(()=>setToast(''),2600)};
 const nav=(v)=>{setView(v);setQuery('')};
 return <div className="app">
  <aside className="sidebar">
   <div className="brand"><div className="crest">NS</div><div><strong>NASS<span>CBT</span></strong><small>Computer-Based Testing</small></div></div>
   <nav>
    <small className="nav-label">STUDENT PORTAL</small>
    {[['dashboard','home','Overview'],['courses','book','Courses'],['exams','exam','Examinations'],['results','chart','Results']].map(([id,ic,label])=><button key={id} className={view===id?'active':''} onClick={()=>nav(id)}><Icon name={ic}/><span>{label}</span>{id==='exams'&&<b>2</b>}</button>)}
   </nav>
   <div className="help"><div className="help-icon">?</div><strong>Exam support</strong><p>Get help with enrollment, access, identity verification, or submission issues.</p><button onClick={()=>flash('Support request noted')}>Contact support</button></div>
   <div className="sidebar-foot">NASS Examination Portal<br/><span>v1.0.0</span></div>
  </aside>
  <main>
   <header><button className="mobile-menu"><Icon name="menu"/></button><div className="top-search"><Icon name="search"/><input placeholder="Search courses and examinations" value={query} onChange={e=>setQuery(e.target.value)}/><kbd>⌘ K</kbd></div><button className="icon-btn"><Icon name="bell"/><i/></button><div className="user"><div className="avatar">BM</div><div><strong>Bashir Modu</strong><small>Candidate • NASS/26/0142</small></div><span>⌄</span></div></header>
   <div className="content">
    {view==='dashboard'&&<Dashboard nav={nav} setExamOpen={setExamOpen}/>} 
    {view==='courses'&&<Courses list={visible} enrolled={enrolled} setEnrolled={setEnrolled} flash={flash}/>} 
    {view==='exams'&&<Exams setExamOpen={setExamOpen}/>} 
    {view==='results'&&<Results/>}
   </div>
  </main>
  {examOpen&&<ExamModal answer={answer} setAnswer={setAnswer} close={()=>setExamOpen(false)} flash={flash}/>} 
  {toast&&<div className="toast"><Icon name="check" size={18}/>{toast}</div>}
 </div>
}

function Dashboard({nav,setExamOpen}){return <>
 <section className="hero"><div><div className="eyebrow">CANDIDATE DASHBOARD • 2026 SESSION</div><h1>Welcome back, Bashir.</h1><p>Your registration is complete. Review your enrolled courses and upcoming examinations.</p></div><button onClick={()=>nav('exams')}>View examinations <Icon name="arrow" size={17}/></button></section>
 <div className="stats"><article><span className="stat-icon blue"><Icon name="book"/></span><div><small>ENROLLED COURSES</small><strong>02</strong><em>Registration confirmed</em></div></article><article><span className="stat-icon gold"><Icon name="exam"/></span><div><small>AVAILABLE EXAMS</small><strong>01</strong><em>1 more scheduled</em></div></article><article><span className="stat-icon green"><Icon name="chart"/></span><div><small>COMPLETED EXAMS</small><strong>02</strong><em className="up">All results released</em></div></article></div>
 <div className="grid-main"><section className="panel"><div className="panel-head"><div><h2>Enrolled courses</h2><p>Courses registered for this examination session</p></div><button onClick={()=>nav('courses')}>Manage enrollment <Icon name="arrow" size={15}/></button></div><div className="course-list">{courses.slice(0,2).map(c=><div className="course-row" key={c.id}><div className="course-art" style={{background:c.color}}><span>{c.code.split(' ')[0]}</span><i/></div><div className="course-info"><small>{c.code}</small><h3>{c.title}</h3><p>{c.faculty}</p><div className="exam-slot"><Icon name="clock" size={14}/><span>{c.examDate}</span></div></div><button aria-label="View examination"><Icon name="arrow"/></button></div>)}</div></section>
 <section className="panel exam-card"><div className="panel-head"><div><h2>Next examination</h2><p>Be prepared and arrive early</p></div><span className="tag">IN 3 DAYS</span></div><div className="exam-mark"><Icon name="exam" size={30}/></div><small>NSS 201</small><h3>National Security Mid-Semester Test</h3><div className="exam-meta"><span><Icon name="clock" size={17}/>18 Aug • 10:00 AM</span><span>45 mins</span></div><button className="primary" onClick={()=>setExamOpen(true)}>View exam details <Icon name="arrow" size={17}/></button></section>
 </div>
 <section className="notice"><div><span>i</span><div><strong>Examination readiness checklist</strong><p>Confirm your device, internet connection and student ID before your next examination.</p></div></div><button>Review checklist <Icon name="arrow" size={16}/></button></section>
 </>}

function Courses({list,enrolled,setEnrolled,flash}){const toggle=id=>{if(enrolled.includes(id)){flash('You are already enrolled for this course')}else{setEnrolled([...enrolled,id]);flash('Course enrollment confirmed')}};return <><PageTitle kicker="COURSE ENROLLMENT" title="Available courses" text="Select the courses you are eligible to take in the current examination session."/><div className="filter"><div><Icon name="search"/><input placeholder="Search by course name or code"/></div><button className="selected">All courses</button><button>Enrolled</button><span>{list.length} courses available</span></div><div className="catalog">{list.map(c=><article className="catalog-card" key={c.id}><div className="catalog-art" style={{background:c.color}}><b>{c.code}</b><span>Exam: {c.examDate}</span></div><div className="catalog-body"><small>{c.faculty}</small><h3>{c.title}</h3><p>Enrollment grants access to this course examination when its scheduled window opens.</p><div><span className={enrolled.includes(c.id)?'pill enrolled':'pill'}>{enrolled.includes(c.id)?'Enrolled':'Eligible'}</span><button onClick={()=>toggle(c.id)}>{enrolled.includes(c.id)?'View details':'Enroll for exam'} <Icon name="arrow" size={16}/></button></div></div></article>)}</div></>}

function Exams({setExamOpen}){return <><PageTitle kicker="ASSESSMENT CENTRE" title="Your examinations" text="Review your schedule, prepare your device and take available tests."/><div className="exam-layout"><section><h2>Upcoming & available</h2>{exams.map((e,i)=><article className="exam-list-card" key={e.title}><div className="date-box"><b>{i?'NOW':'18'}</b><span>{i?'OPEN':'AUG'}</span></div><div className="exam-desc"><small>{e.course}</small><h3>{e.title}</h3><p>{e.date}{e.time&&` • ${e.time}`} &nbsp; | &nbsp; {e.duration} &nbsp; | &nbsp; {e.questions} questions</p></div><span className={'status '+e.status}>{e.status==='ready'?'Ready to take':'Scheduled'}</span><button onClick={()=>setExamOpen(true)}>{e.status==='ready'?'Start test':'View details'} <Icon name="arrow" size={16}/></button></article>)}</section><aside className="rules"><div className="exam-mark"><Icon name="check" size={28}/></div><h3>Before you begin</h3><ol><li>Use a stable internet connection.</li><li>Close other applications and tabs.</li><li>Keep your student ID nearby.</li><li>Submit before the timer ends.</li></ol><p>Need help? <u>Contact exam support</u></p></aside></div></>}

function Results(){return <><PageTitle kicker="EXAMINATION RESULTS" title="Results" text="View released scores for examinations you have completed."/><div className="result-summary"><div><span>Overall average</span><strong>78%</strong><small>2 of 2 examinations passed</small></div><div className="ring"><b>78</b><span>/100</span></div></div><section className="panel result-table"><div className="panel-head"><div><h2>Released results</h2><p>Your completed computer-based examinations</p></div></div><div className="thead"><span>COURSE</span><span>DATE</span><span>SCORE</span><span>STATUS</span></div>{[['ICT 114','Digital Literacy & Cyber Safety','04 Aug 2026','84%'],['NSS 101','Foundations of National Security','21 Jul 2026','72%']].map(r=><div className="trow" key={r[0]}><span><b>{r[0]}</b><small>{r[1]}</small></span><span>{r[2]}</span><strong>{r[3]}</strong><em>Passed</em></div>)}</section></>}

function PageTitle({kicker,title,text}){return <section className="page-title"><div><div className="eyebrow">{kicker}</div><h1>{title}</h1><p>{text}</p></div></section>}

function ExamModal({answer,setAnswer,close,flash}){return <div className="overlay"><div className="modal"><header><div><small>PRACTICE TEST • ICT 114</small><h2>Cyber Safety Practice Test</h2></div><div className="timer"><Icon name="clock"/>19:42</div></header><div className="exam-body"><aside><span>QUESTION 1 OF 15</span><div className="numbers">{Array.from({length:15},(_,i)=><button className={i===0?'current':''}>{i+1}</button>)}</div><div className="legend"><i/>Answered <i/>Current</div></aside><section><span className="qtype">SINGLE CHOICE</span><h3>Which of the following is the strongest example of a secure password?</h3>{['password123','Bashir2026','N@ss!26_Secure','1234567890'].map((a,i)=><label className={answer===a?'chosen':''}><input type="radio" name="answer" onChange={()=>setAnswer(a)}/><b>{String.fromCharCode(65+i)}</b>{a}</label>)}</section></div><footer><button onClick={close}>Exit practice</button><span>Changes are saved automatically</span><button className="primary" onClick={()=>{if(answer){flash('Answer saved');close()}}}>Save & next <Icon name="arrow" size={16}/></button></footer></div></div>}

createRoot(document.getElementById('root')).render(<App/>);
