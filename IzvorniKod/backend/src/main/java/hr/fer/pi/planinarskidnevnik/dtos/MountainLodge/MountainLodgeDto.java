package hr.fer.pi.planinarskidnevnik.dtos.MountainLodge;

import hr.fer.pi.planinarskidnevnik.models.Hill;
import hr.fer.pi.planinarskidnevnik.models.Utility;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.List;

public class MountainLodgeDto {

        @Size(max = 50, message = "Ime smije sadržavati najviše 50 znakova.")
        @NotBlank(message = "Ime je obavezno.")
        private String name;

        @NotBlank(message = "Nadmorska visina je obavezna")
        private Long elevation;

        @Size(max = 50, message = "Ime smije sadržavati najviše 50 znakova.")
        @NotBlank(message = "Planina je obavezna")
        private Hill hillName;

        private List<Utility> utilities;

        private byte[] image;

        public MountainLodgeDto() {
        }

        public MountainLodgeDto(String name, Long elevation, Hill hillName, List<Utility> utilities, byte[] image) {
            this.name = name;
            this.elevation = elevation;
            this.hillName = hillName;
            this.utilities = utilities;
            this.image = image;
        }

        public String getName() { return name; }

        public void setName(String name) { this.name = name; }

        public Long getElevation() { return elevation; }

        public void setElevation(Long elevation) { this.elevation = elevation; }

        public Hill getHillName() { return hillName; }

        public void setHillName(Hill hillName) { this.hillName = hillName; }

        public List<Utility> getUtilities() { return utilities; }

        public void setUtilities(List<Utility> utilities) { this.utilities = utilities; }

        public byte[] getImage() { return image; }

        public void setImage(byte[] image) { this.image = image; }

        @java.lang.Override
        public java.lang.String toString() {
            return "UserCreateDto{" +
                    "name='" + name + '\'' +
                    ", elevation=" + elevation +
                    ", hillName='" + hillName + '\'' +
                    ", utilities=" + utilities +
                    ", image=" + java.util.Arrays.toString(image) +
                    '}';
        }


        public int hashCode() {
            int result = java.util.Objects.hash(super.hashCode(), name, elevation, hillName, utilities);
            result = 31 * result + java.util.Arrays.hashCode(image);
            return result;
        }
}

