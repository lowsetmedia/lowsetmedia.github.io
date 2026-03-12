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

    for (let i = 1; i <= project.imageCount; i++) {

      const img = document.createElement("img")
      img.src = `${project.folder}/${i}.jpg`
      img.loading="lazy"

      if (project.fullImages.includes(i)) {
        img.classList.add("full")
      }

      gallery.appendChild(img)

    }

})