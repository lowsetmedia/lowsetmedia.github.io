function applyMasonry() {
  const gallery = document.querySelector('.project-gallery')
  if (!gallery) return

  const images = gallery.querySelectorAll('img')

  images.forEach(img => {
    const gap = 16
    const height = img.getBoundingClientRect().height
    const span = Math.ceil((height + gap) / 1)
    img.style.gridRowEnd = `span ${span}`
  })
}

let masonryResizeTimer = null

window.addEventListener("resize", () => {
  clearTimeout(masonryResizeTimer)

  masonryResizeTimer = setTimeout(() => {
    requestAnimationFrame(() => {
      applyMasonry()
    })
  }, 150)
})

const params = new URLSearchParams(window.location.search)

const slug = params.get("project")
const category = params.get("cat")

fetch(`../assets/json/${category}.json`)
  .then(res => res.json())
  .then(projects => {

    const project = projects.find(p => p.slug === slug)

    if (!project) return

    document.getElementById("project-title").textContent = project.title

    const gallery = document.querySelector(".project-gallery")
    let loadedImages = 0

    for (let i = 1; i <= project.imageCount; i++) {

      const img = document.createElement("img")
      img.src = `${project.folder}/${i}.jpg`
      img.loading="lazy"
      img.decoding="async"

      img.addEventListener("load", () => {
        loadedImages++

        if (loadedImages === project.imageCount) {
          applyMasonry()
          gallery.classList.add("loaded")
        }
      })

      if (project.fullImages.includes(i)) {
        img.classList.add("full")
      }

      gallery.appendChild(img)

    }

})