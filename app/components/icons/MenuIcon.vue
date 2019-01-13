<template>
  <div class="wrapper">
    <svg 
      x="0px" 
      y="0px" 
      width="100px" 
      height="100px" 
      viewBox="0 0 100 100" 
    >
      <image id="image0" width="100" height="100" x="0" y="0"
        href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAABGdBTUEAALGPC/xhBQAAACBjSFJN
        AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAWlBMVEUAAACMaZ6MbJ6Na5+N
        bJ+MbJ9/f6qMa5+Na56MbJ+Ma56Ma56MbZ6Map2NbJ+qjKjlzLvv2L7Zv7fkzLqjhaakhqejhKb6
        797YvraWdqLTrpLvyI7YspL///9KRwS5AAAADnRSTlMAHazy5YgG7YfziuY6PHSic6sAAAABYktH
        RB3rA3GRAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAB3RJTUUH4wEMCTMYw2STbQAAARJJREFUWMPt
        l1sPgjAMhREnTpHqdMMb//93GpwmQrulZSHeOA97ol/S00OTZtmkrmb5HDhSi4KuX7LKW2kSkMN2
        ZzjagyIBKziw6o0BIAEAzPpRAMVaeXvsQIB++usGAkrYpLVQQpUG8C28flTj+NgIoNCqB6ACKBoj
        wLGncQE4B0IAzoEQgHMgBlRpAJwDqYlEDpLHmBgki+tdrIVpH4T2ge3sBdk+cA9HHG8KeIzCFpIB
        OAdoJ9ooAOfA9QEuCvjYHJAOSHJAOvA1ORhk4o/tA6mJKAdCgB9jO4Ka8QQBcKczntEAbQgc43n7
        v3AKAs7siyNkYirgcuUpACih4dU3gZNH8zugjy7/PzCkNH32/aluoY+mOkhyQ/IAAAAldEVYdGRh
        dGU6Y3JlYXRlADIwMTktMDEtMTJUMTY6NTE6MjQtMDc6MDBdbXJqAAAAJXRFWHRkYXRlOm1vZGlm
        eQAyMDE5LTAxLTEyVDE2OjUxOjI0LTA3OjAwLDDK1gAAAABJRU5ErkJggg==" 
      />
    </svg>
  </div>
</template>

<script>
export default {
  name: "menu_icon"
}
</script>

<style>
  .wrapper{
    animation-duration: 4s;
    animation-name: menu;
    animation-iteration-count: infinite;
    animation-direction: alternate-reverse;
    animation-delay: 2s;
    cursor: pointer;
  }

  .wrapper:active{
    outline: none;
    background-color: transparent;
  }

  @keyframes menu {
    0%, 48% {
      transform: rotate(0deg);
    } 
    49% {
      transform: rotate(-12deg);
    }
    51% {
      transform: rotate(12deg);
    }
    52%, 100% {
      transform: rotate(0deg);
    }
  }
</style>


