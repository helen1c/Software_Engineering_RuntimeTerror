package hr.fer.pi.planinarskidnevnik.dtos.MountainLodge;

import hr.fer.pi.planinarskidnevnik.models.Hill;
import hr.fer.pi.planinarskidnevnik.models.Utility;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

public class MountainLodgeCreateRequest {

        @Size(max = 50, message = "Ime smije sadržavati najviše 50 znakova.")
        @NotBlank(message = "Ime je obavezno.")
        private String name;

        @NotNull
        private Long elevation;

        @NotNull
        private Long hillId;

        private List<Long> utilities;

        private byte[] image;

        public MountainLodgeCreateRequest() {
        }

        public MountainLodgeCreateRequest(String name, Long elevation, Long hillId, List<Long> utilities, byte[] image) {
            this.name = name;
            this.elevation = elevation;
            this.hillId = hillId;
            this.utilities = utilities;
            this.image = image;
        }

        public String getName() { return name; }

        public void setName(String name) { this.name = name; }

        public java.lang.Long getElevation() { return elevation; }

        public void setElevation(java.lang.Long elevation) { this.elevation = elevation; }

        public Long getHillId() { return hillId; }

        public void setHillId(Long hillId) { this.hillId = hillId; }

        public List<Long> getUtilities() { return utilities; }

        public void setUtilities(List<Long> utilities) { this.utilities = utilities; }

        public byte[] getImage() { return image; }

        public void setImage(byte[] image) { this.image = image; }

        @java.lang.Override
        public java.lang.String toString() {
            return "UserCreateDto{" +
                    "name='" + name + '\'' +
                    ", elevation=" + elevation +
                    ", hillName='" + hillId + '\'' +
                    ", utilities=" + utilities +
                    ", image=" + java.util.Arrays.toString(image) +
                    '}';
        }


        public int hashCode() {
            int result = java.util.Objects.hash(super.hashCode(), name, elevation, hillId, utilities);
            result = 31 * result + java.util.Arrays.hashCode(image);
            return result;
        }
}

