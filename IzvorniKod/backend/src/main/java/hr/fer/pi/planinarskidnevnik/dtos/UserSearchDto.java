package hr.fer.pi.planinarskidnevnik.dtos;

public class UserSearchDto {

    private Long id;
    private byte[] image;
    private String name;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public UserSearchDto(){}

    public UserSearchDto(String name, byte[] image){
        this.name=name;
        this.image=image;
    }


}
