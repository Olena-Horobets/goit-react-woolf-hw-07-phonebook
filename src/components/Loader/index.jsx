import { Player } from '@lottiefiles/react-lottie-player';

export function Loader() {
  return (
    <Player
      src="https://lottie.host/120ba30f-610a-429d-9e86-efcf3cdd901e/YJopbMn9sc.json"
      speed="1"
      style={{
        width: 300,
        height: 300,
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
      loop
      controls={false}
      autoplay
      direction="1"
      mode="normal"
    ></Player>
  );
}
