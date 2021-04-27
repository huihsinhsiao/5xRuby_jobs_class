document.addEventListener('DOMContentLoaded', function() {
  const url = 'https://job-list-9527.herokuapp.com/api/v1/jobs/job_info'
  const container = document.querySelector('.container')
  
  async function fetchJobs() {
    const response = await fetch(url)
    const jsonResponse = await response.json()
    return jsonResponse.data
  }
  
  // 想問這邊的原理，是為了取得(職缺202筆，總頁數，第一頁)嗎
  function renderView(jobs, pageCount, nowPage) {
    createBaseElement(nowPage, pageCount)
    createJobTbody(jobs)
    // console.log(jobs)
  }

  async function firstLoaded() {
    const jobInfos = await fetchJobs()
    const allPageCount = Math.ceil(jobInfos.length / 10)
    renderView(jobInfos, allPageCount, 1)
  }

  // 進入口

  window.addEventListener('DOMContentLoaded', function() {
    firstLoaded()
  })

  function createBaseElement(nowPage, pageCount) {
    const prePage = nowPage - 1
    const nextPage = nowPage + 1
    const container = document.querySelector('.container')
    container.innerHTML = `
    <div class="css-table">
      <div class="css-thead">
        <div class="css-tr">
          <div class="css-th">日期</div>
          <div class="css-th">職位名稱</div>
          <div class="css-th">薪資</div>
          <div class="css-th">公司名稱</div>
          <div class="css-th">公司地址</div>
        </div>
      </div>
      <div class="css-t-body">
      </div>
    </div>
    <div class="pagination">
      <span class="backpage hidden" data-page="${prePage}" data-type="pagination">上一頁</span>
      <span id="page1" class="pageNumber">1</span>
      <span class="nextpage" data-page="${nextPage}" data-type="pagination">下一頁</span>
      <span class="page-counter"> ${nowPage} / ${pageCount} 頁<span>
    </div>
    `
  }

  // 放入資料囉
  function createJobTbody(jobs) {
    const infoBlock = document.querySelector('.css-t-body')
    let result = ''
      jobs.forEach((job) => {
        result = result + `
        <a class="css-tr" href='http://${job.link}'>
          <div class="css-td">${job.date}</div>
          <div class="css-td">${job.name}</div>
          <div class="css-td">${job.salary}</div>
          <div class="css-td">${job.company_name}</div>
          <div class="css-td">${job.address}</div>
        </a>
        `
      })
    infoBlock.innerHTML = result
  }

  // 分頁魔王
  // function pagination(全部的資料, nowPage) {
  //   console.log(nowPage)
  //   const jobTotal = 全部資料.length
  //   //設定每頁只要10筆
  //   const perpage = 10
  //   })

    
  // }
})