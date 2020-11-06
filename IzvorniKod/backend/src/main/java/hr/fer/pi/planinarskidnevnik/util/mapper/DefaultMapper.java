package hr.fer.pi.planinarskidnevnik.util.mapper;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

public interface DefaultMapper<K, V> {

    V map(K from);

    default Page<V> mapPage(Page<K> from) {
        return new PageImpl<V>(mapToList(from.getContent()), from.getPageable(), from.getTotalElements());
    }

    default List<V> mapToList(Collection<K> from) {
        return from.stream().map(this::map).collect(Collectors.toList());
    }

}
